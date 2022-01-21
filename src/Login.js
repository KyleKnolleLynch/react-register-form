import { useState, useRef, useEffect, useContext } from 'react'
import AuthContext from './context/AuthProvider'
import styles from './Login.module.css'
import axios from './api/axios'
const LOGIN_URL = '/auth'

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

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
      console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))

      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles

      setAuth({ user, pwd, roles, accessToken })
      setUser('')
      setPwd('')
      setSuccess(true)
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
    <>
      {success ? (
        <section className={styles.loginSection}>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='#' className={styles.loginLink}>
              Go to Home
            </a>
          </p>
        </section>
      ) : (
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
              {/* put router link here */}
              <a href='#' className={styles.loginLink}>
                Sign Up
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Login
