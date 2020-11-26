// import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import '../../css/registration/Registration.css'
// import ipAddress from '../../constants'
import { withRouter } from "react-router-dom"
import { BehaviorSubject } from 'rxjs'
import { delay } from 'rxjs/operators'
import auth from '../../auth/auth'
import { parseJWT } from '../../helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../redux/user/actions'
// import { goToForgotPasswordPage, goToRegistrationPage } from '../../helpers'

const loginQuery$ = new BehaviorSubject('')
const delayedLoginQuery$ = loginQuery$.pipe(
  delay(3000)
)

// const onChangeLoginQuery = (value) => {
//   delayedLoginQuery$.next(value)
// }

function SignInForm({ history }) {
  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)
  const [loginValidationError, setLoginValidationError] = useState(null)
  const [passwordValidationError, setPasswordValidationError] = useState(null)
  const [active, setActive] = useState("inactive")
  const [userValidationError, setUserValidationError] = useState(null)

  const dispatch = useDispatch()
  const setUser = useCallback((data) => {
    dispatch(userActions.setUser(data))
  }, [dispatch])

  const validateLogin = (login) => {
    // onChangeLoginQuery(login)
    // if (!login) {
    //     setLoginValidationError("Please enter your login!")
    //     setLogin(null)
    // }
    // else if (login.length < 3) {
    //     setLoginValidationError("Your login must be longer than 2 characters!")
    //     setLogin(null)
    // }
    // else {
    //     setLoginValidationError(null)
    //     setLogin(login)
    // }
    setLogin(login)
  }

  const validatePassword = password => {
    // if (!password) {
    //     setPasswordValidationError("Please enter your password!")
    //     setPassword(null)
    // }
    // else if (password.length < 4) {
    //     setPasswordValidationError("Entered password is too short!")
    //     setPassword(null)
    // }
    // else {
    //     setPasswordValidationError(null)
    //     setPassword(password)
    // }
    setPassword(password)

  }

  // const parseJWT = token => {
  //     var base64Url = token.split('.')[1];
  //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));

  //     return JSON.parse(jsonPayload);
  // }

  const validateUser = (e) => {
    e.preventDefault()
    auth.login({ login, password }, accessToken => {
      setUser(parseJWT(accessToken))
      history.push("/news")
    })
  }

  useEffect(() => {
    if (login && password) {
      setActive("active")
    }
    else {
      setActive("inactive")
    }
  }, [login, password])

  useEffect(() => {
    let subscription = delayedLoginQuery$.subscribe(delayedLoginQuery => {
      setLogin(delayedLoginQuery)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="form-container">
      <form>
        <h2>Sign In</h2>
        <label>
          Login
            {loginValidationError && (
            <span className="form-error">{loginValidationError}</span>
          )}
        </label>
        <input
          placeholder="Login"
          onChange={(e) => validateLogin(e.target.value)}
        />
        <label>
          Password
            {passwordValidationError && (
            <span className="form-error">{passwordValidationError}</span>
          )}
        </label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => validatePassword(e.target.value)}
        />
        {userValidationError && <span className="form-error">{userValidationError}</span>}
        <button className={`registration-button-active`} onClick={validateUser}>Sign In</button>
        <div className="form-links">
          <button onClick={() => history.push("/forgot-password")}>Forgot my password</button>
          <button onClick={() => history.push("/sign-up")}>Create a new account</button>
        </div>
      </form>

    </div>
  )
}

export default withRouter(SignInForm)
