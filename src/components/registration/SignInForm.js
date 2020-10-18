import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../../css/registration/Registration.css'
import ipAddress from '../../constants'
import { withRouter } from "react-router-dom"
function SignInForm({ history }) {
    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)
    const [loginValidationError, setLoginValidationError] = useState(null)
    const [passwordValidationError, setPasswordValidationError] = useState(null)
    const [active, setActive] = useState("inactive")
    const [userValidationError, setUserValidationError] = useState(null)

    console.log("login", login)
    console.log("password", password)

    const validateLogin = (login) => {
        if (!login) {
            setLoginValidationError("Please enter your login!")
            setLogin(null)
        }
        else if (login.length < 3) {
            setLoginValidationError("Your login must be longer than 2 characters!")
            setLogin(null)
        }
        // check if login exists in database 
        else {
            setLoginValidationError(null)
            setLogin(login)
        }
    }

    const validatePassword = password => {
        if (!password) {
            setPasswordValidationError("Please enter your password!")
            setPassword(null)
        }
        // else if (
        //     check if password exists in database and it corresponds to the entered login
        // )
        else if(password.length < 4) {
            setPasswordValidationError("Entered password is too short!")
            setPassword(null)
        }
        else {
            setPasswordValidationError(null)
            setPassword(password)
        }
    }

    const parseJWT = token => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const validateUser = (e) => {
        e.preventDefault()
        axios.post(`${ipAddress}/auth/login`, { username: login, password })
            .then(res => {
                console.log("entered then", res, res.data)
                localStorage.setItem("access-token", res.data.accessToken)
                localStorage.setItem("refresh-token", res.data.refreshToken)
                window.parsedToken = parseJWT(res.data.accessToken)
                setInterval(() => {
                    axios.post(`${ipAddress}/auth/refresh-token`, { token: localStorage.getItem("refresh-token") })
                        .then(data => {
                            window.parsedToken = parseJWT(res.data.accessToken)
                            localStorage.setItem("access-token", data.data.accessToken)
                            localStorage.setItem("refresh-token", data.data.newRefreshToken)
                        })
                }, 299000)
                history.push("/")
            }).catch(err => {
                setUserValidationError("Your Login or Password is incorrect!")
            })
    }

    const goToForgotPasswordPage = () => {
        history.push("/forgot-password")
    }

    const goToRegistrationPage = () => {
        history.push("/sign-up")
    }

    useEffect(() => {
        if (login && password) {
            setActive("active")
        }
        else {
            setActive("inactive")
        }
    }, [login, password])

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
                    placeholder="student123"
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
                    onChange={(e) => validatePassword(e.target.value)}
                />
                {userValidationError && <span className="form-error">{userValidationError}</span>}
                <button className={`registration-button-${active}`} onClick={validateUser}>Sign In</button>
                <div className="form-links">
                    <button onClick={goToForgotPasswordPage}>Forgot my password</button>
                    <button onClick={goToRegistrationPage}>Create a new account</button>
                </div>
            </form>

        </div>
    )
}

export default withRouter(SignInForm)
