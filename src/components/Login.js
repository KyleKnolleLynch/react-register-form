import { useState, useRef, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import styles from './Login.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles

      setAuth({ user, pwd, roles, accessToken })
      setUser('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <section className={styles.loginSection}>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor='username' className={styles.loginLabel}>
          Username:
        </label>
        <input
          type='text'
          id='username'
          className={styles.loginInput}
          ref={userRef}
          autoComplete='off'
          onChange={e => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor='password' className={styles.loginLabel}>
          Password:
        </label>
        <input
          type='password'
          id='password'
          className={styles.loginInput}
          onChange={e => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button className={styles.loginBtn}>Sign In</button>
      </form>

      <p>
        Need an account?
        <br />
        <span className='line'>
          <Link to='/register'>Sign Up</Link>
        </span>
      </p>
    </section>
  )
}

export default Login
