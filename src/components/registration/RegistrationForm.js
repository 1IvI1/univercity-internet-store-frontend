import React, { useState, useEffect } from "react";
import OptionsSelection from "./OptionsSelection";
import "../../css/registration/Registration.css";
import axios from "axios";
import { ipAddress } from "../../constants";
import { withRouter, Link } from "react-router-dom"
import { goToSignIn } from '../../helpers'
import { getFaculties, getGroups, getUniversities } from "./services/RegistrationFormServices";

const RegistrationForm = (props) => {
  const options = {
    universities: [
      {
        id: 1,
        name: "UTM",
      },
      {
        id: 2,
        name: "USM",
      },
    ],
    UTMfaculties: [
      {
        id: 1,
        name: "FCIM",
      },
    ],
    UTMFCIMspecialinosti: [
      {
        id: 1,
        name: "Informatica Aplicata",
      },
    ],
    USMfaculties: [
      {
        id: 1,
        name: "IDUNNO",
      },
    ],
    USMIDUNNOspecialinosti: [{ id: 1, name: "Microbiologia" }],
  }
  const [universities, setUniversities] = useState(null)
  const [faculties, setFaculties] = useState(null)
  const [groups, setGroups] = useState(null)
  const [universitiesDropdownShown, setUniversitiesDropdownShown] = useState(false)
  const [facultiesDropdownShown, setFacultiesDropdownShown] = useState(false)
  const [specialtiesDropdownShown, setSpecialtiesDropdownShown] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState("")
  const [university, setUniversity] = useState("")
  const [faculty, setFaculty] = useState("")
  const [specialty, setSpecialty] = useState("")
  // Validating inputs
  const [nameValidationError, setNameValidationError] = useState("")
  const [emailValidationError, setEmailValidationError] = useState("")
  const [loginValidationError, setLoginValidationError] = useState("")
  const [passwordValidationError, setPasswordValidationError] = useState("")
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("")
  const [phoneValidationError, setPhoneValidationError] = useState("")
  // Activate Sign Up Button
  const [buttonActive, setButtonActive] = useState("")


  const universitiesDropdownToggle = () => {
    setUniversitiesDropdownShown(!universitiesDropdownShown)
  };

  const facultiesDropdownToggle = () => {
    setFacultiesDropdownShown(!facultiesDropdownShown)
  };

  const specialtiesDropdownToggle = () => {
    setSpecialtiesDropdownShown(!specialtiesDropdownShown)
  };

  // Validating inputs
  const validateName = (name) => {
    if (name.length < 3) {
      setNameValidationError("Your name must be longer than 2 characters!")
      setButtonActive("inactive")
    } else if (!/^[a-z]+$/i.test(name)) {

      setNameValidationError("Your name must not contain any characters that are not letters!")
      setButtonActive("inactive")
    }
    else {
      setNameValidationError("")
      setName(name)
    }
  };

  const validateEmail = (email) => {
    if (email.length < 9) {
      setEmailValidationError("Your email address is too short or invalid!")
      setButtonActive("inactive")
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmailValidationError("Your email is not valid!")
      setButtonActive("inactive")
    } else if (email.split("@")[1] === "" || email.split("@")[1].length < 4) {
      setEmailValidationError("Please provide a valid email address!")
      setButtonActive("inactive")
    } else {
      setEmailValidationError("")
      setEmail(email)
    }
  };

  const validatePhone = (phone) => {
    if (phone.length !== 12) {
      setPhoneValidationError("Phone number is too short!")
      setButtonActive("inactive")
    } else if (
      !/^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(
        phone
      )
    ) {
      setPhoneValidationError("Please enter a number in format +373-XX-XXX-XXX!")
      setButtonActive("inactive")
    } else {
      setPhoneValidationError("")
      setPhone(phone)
    }
  };

  const validateLogin = (login) => {
    // we will probably check all the existing logins and only allow the user to choose a unique one
    if (login.length < 3) {
      setLoginValidationError("Your login must be longer than 2 characters!")
      setButtonActive("inactive")
    }
    else {
      setLoginValidationError("")
      setLogin(login)
    }
  };

  const validatePassword = (passwd) => {
    if (passwd.length < 8) {
      setPasswordValidationError("Your password must be at least 8 characters!")
      setButtonActive("inactive")
    }
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(passwd)) {
      setPasswordValidationError("Your password is too weak!")
      setButtonActive("inactive")
    }
    else {
      setPasswordValidationError("")
      setPassword(passwd)
    }
  }

  const confirmPassword = password => {
    if (password.localeCompare(password)) {
      setPasswordConfirmationError("Passwords do not match!")
      setButtonActive("inactive")
    }
    else {
      setPasswordConfirmationError("")
    }
  }

  // activate Sign Up button if all the fields are filled correctly
  useEffect(() => {
    console.log(name !== "" && email !== "" && phone !== "" && password !== "" && login !== "" && university !== "" && faculty !== "" && specialty !== "")
    if (name !== "" && email !== "" && phone !== "" && password !== "" && login !== "" && university !== "" && faculty !== "" && specialty !== "") {
      setButtonActive("active")
      console.log("active")
    }
    else {
      setButtonActive("inactive")
    }
  }, [name, email, phone, password, login, university, faculty, specialty])

  useEffect(() => {
    getUniversities().then(response => {
      setUniversities(response.data)
    })
  }, [])

  useEffect(() => {
    university && getFaculties(university.id).then(response => {
      setFaculties(response.data)
    })
  }, [university])

  useEffect(() => {
    faculty && getGroups(faculty.id).then(response => {
      setGroups(response.data)
    })
  }, [faculty])

  return (
    <div className="form-container">
      <form>
        <h2>Sign Up</h2>
        <label>
          Your Name
            {!!nameValidationError.length && (
            <span className="form-error">{nameValidationError}</span>
          )}
        </label>
        <input
          className={`input-${!!nameValidationError.length && "error"}`}
          placeholder="Jumbo..."
          onBlur={(e) => validateName(e.target.value)}
        />
        <label>
          Your Email
            {!!emailValidationError.length && (
            <span className="form-error">{emailValidationError}</span>
          )}
        </label>
        <input
          placeholder="something@gmail.com"
          onBlur={(e) => validateEmail(e.target.value)}
        />
        <label>
          Your Phone
            {!!phoneValidationError.length && (
            <span className="form-error">{phoneValidationError}</span>
          )}
        </label>
        <input
          placeholder="+37368327463"
          onBlur={(e) => validatePhone(e.target.value)}
        />
        <label>
          Your Login
            {!!loginValidationError.length && (
            <span className="form-error">{loginValidationError}</span>
          )}
        </label>
        <input
          placeholder="student123"
          onBlur={(e) => validateLogin(e.target.value)}
        />
        <label>
          Your Password
            {!!passwordValidationError.length && (
            <span className="form-error">{passwordValidationError}</span>
          )}
        </label>
        <input
          type="password"
          onBlur={(e) => validatePassword(e.target.value)}
        />
        <label>
          Confirm Your Password
            {!!passwordConfirmationError.length && (
            <span className="form-error">{passwordConfirmationError}</span>
          )}
        </label>
        <input
          type="password"
          onBlur={(e) => confirmPassword(e.target.value)}
        />
        <label>Select Your University</label>
        {universities && <OptionsSelection
          options={universities}
          selectedOption={university}
          showOptions={universitiesDropdownShown}
          toggleShowOptions={universitiesDropdownToggle}
          selectOption={setUniversity}
        />}
        {university && (
          <>
            <label>Select Your Faculty</label>
            <OptionsSelection
              options={faculties}
              selectedOption={faculty}
              showOptions={facultiesDropdownShown}
              toggleShowOptions={facultiesDropdownToggle}
              selectOption={setFaculty}
            />
          </>
        )}
        {faculty && (
          <>
            <label>Специальность</label>
            <OptionsSelection
              options={groups}
              selectedOption={specialty}
              showOptions={specialtiesDropdownShown}
              toggleShowOptions={specialtiesDropdownToggle}
              selectOption={setSpecialty}
            />
          </>

        )}
        <button disabled={buttonActive !== "active"} className={`registration-button-${buttonActive}`} onClick={(e) => {
          e.preventDefault()
          axios.post(`${ipAddress}/auth/sign-up`, {
            name: name,
            username: login,
            password: password,
            email: email,
            phone: phone,
          }).then(() => {
            goToSignIn(props.history)
          })
        }} >Sign Up</button>
        <div className="form-links">
          <button onClick={e => {
            e.preventDefault()
            props.history.push("/sign-in")
            console.log("Clicked router");
          }}>I already have an account</button>
        </div>
      </form>
    </div>
  );

}

export default withRouter(RegistrationForm)