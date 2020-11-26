import React, { useState } from 'react'
// import axios from 'axios'
// import ipAddress from '../../constants'
import '../../css/registration/Registration.css'
import { withRouter } from "react-router-dom"

const ForgotPassword = ({history}) => {
    const [emailValidationError, setEmailValidationError] = useState(null)
    const [active, setActive] = useState("inactive")
    const [emailSent, setEmailSent] = useState(null)
    const [codeValidationError, setCodeValidationError] = useState(null)

    // const validateEmail = email => {
        setActive("active")
        // axios.post(`${ipAddress}/

        // `)
        // .then(res => {})
        // .catch(err => setEmailValidationError("Found no user with this email address."))
    // }

    const sendRestorationEmail = () => {
        setEmailSent("sent")
    }

    const validateCode = (code) => {

    }

    return (
        <div className="form-container">
            <form>
                <h2>Restore Your Password</h2>
                <label>
                    Enter Your Email
            {emailValidationError && (
                        <span className="form-error">{emailValidationError}</span>
                    )}
                </label>
                <input
                    placeholder="somebody@something.com"
                    // onChange={(e) => validateEmail(e.target.value)}
                />
                {
                    emailSent && <div>
                        <p>We've sent the code to your email address. Please check it and enter the code below.</p>
                        {codeValidationError && <span>{codeValidationError}</span>}
                        <input onChange={(e) => validateCode(e.target.value)} placeholder="000000" />

                    </div>
                }
                <button className={`registration-button-${active}`} onClick={sendRestorationEmail}>Restore Password</button>
                <div className="form-links">
                    <button onClick={() => history.push("/sign-in")}>Back to sign in page</button>
                    <button onClick={() => history.push("/")}>Create a new account</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(ForgotPassword)