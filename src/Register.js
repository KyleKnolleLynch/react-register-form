import { useRef, useState, useEffect } from 'react'
import styles from './Register.module.css'
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)

    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async e => {
    e.preventDefault()

    //  if button is enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }

    console.log(user, pwd)
    setSuccess(true)
  }

  return (
    <>
      {success ? (
        <section className={styles.registerSection}>
          <h1>Success!</h1>
          <p>
            <a href='#'>Sign In</a>
          </p>
        </section>
      ) : (
        <section className={styles.registerSection}>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            {/* USERNAME FIELD */}
            <label htmlFor='username' className={styles.registerLabel}>
              Username:{' '}
              <span className={validName ? styles.valid : styles.hide}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-user-check'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                  <circle cx='8.5' cy='7' r='4'></circle>
                  <polyline points='17 11 19 13 23 9'></polyline>
                </svg>
              </span>
              <span
                className={validName || !user ? styles.hide : styles.invalid}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-user-x'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                  <circle cx='8.5' cy='7' r='4'></circle>
                  <line x1='18' y1='8' x2='23' y2='13'></line>
                  <line x1='23' y1='8' x2='18' y2='13'></line>
                </svg>
              </span>
            </label>
            <input
              type='text'
              id='username'
              className={styles.registerInput}
              ref={userRef}
              autoComplete='off'
              onChange={e => setUser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id='uidnote'
              className={
                userFocus && user && !validName
                  ? styles.instructions
                  : 'offscreen'
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-info'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <line x1='12' y1='16' x2='12' y2='12'></line>
                <line x1='12' y1='8' x2='12.01' y2='8'></line>
              </svg>
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            {/* PASSWORD FIELD */}
            <label htmlFor='password' className={styles.registerLabel}>
              Password:{' '}
              <span className={validPwd ? styles.valid : styles.hide}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-user-check'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                  <circle cx='8.5' cy='7' r='4'></circle>
                  <polyline points='17 11 19 13 23 9'></polyline>
                </svg>
              </span>
              <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-user-x'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                  <circle cx='8.5' cy='7' r='4'></circle>
                  <line x1='18' y1='8' x2='23' y2='13'></line>
                  <line x1='23' y1='8' x2='18' y2='13'></line>
                </svg>
              </span>
            </label>
            <input
              type='password'
              id='password'
              className={styles.registerInput}
              onChange={e => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id='pwdnote'
              className={
                pwdFocus && !validPwd ? styles.instructions : 'offscreen'
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-info'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <line x1='12' y1='16' x2='12' y2='12'></line>
                <line x1='12' y1='8' x2='12.01' y2='8'></line>
              </svg>
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number, and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label='exclamation mark'>!</span>
              <span aria-label='at symbol'>@</span>
              <span aria-label='hashtag'>#</span>
              <span aria-label='dollar sign'>$</span>
              <span aria-label='percent'>%</span>
            </p>

            {/*  PASSWORD MATCH FIELD */}
            <label htmlFor='confirm_pwd' className={styles.registerLabel}>
              Confirm Password:{' '}
              <span
                className={validMatch && matchPwd ? styles.valid : styles.hide}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-user-check'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                  <circle cx='8.5' cy='7' r='4'></circle>
                  <polyline points='17 11 19 13 23 9'></polyline>
                </svg>
              </span>
              <span
                className={
                  validMatch || !matchPwd ? styles.hide : styles.invalid
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-user-x'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                  <circle cx='8.5' cy='7' r='4'></circle>
                  <line x1='18' y1='8' x2='23' y2='13'></line>
                  <line x1='23' y1='8' x2='18' y2='13'></line>
                </svg>
              </span>
            </label>
            <input
              type='password'
              id='confirm_pwd'
              className={styles.registerInput}
              onChange={e => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id='confirmnote'
              className={
                matchFocus && !validMatch ? styles.instructions : 'offscreen'
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-info'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <line x1='12' y1='16' x2='12' y2='12'></line>
                <line x1='12' y1='8' x2='12.01' y2='8'></line>
              </svg>
              Must match the first password input field.
            </p>

            <button
              className={styles.registerBtn}
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span className={styles.line}>
              {/*  router link here  */}
              <a href='#'>Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Register
