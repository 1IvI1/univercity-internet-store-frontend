import React, { Component } from "react";
import OptionsSelection from "./OptionsSelection";
import "../../css/registration/Registration.css";
import axios from "axios";
import ipAddress from "../../constants";
import {withRouter} from "react-router-dom"
class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
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
      },
      universitiesDropdownShown: false,
      facultiesDropdownShown: false,
      specialinostiDropdownShown: false,
      name: "",
      email: "",
      age: "",
      phone: "",
      password: "",
      login: "",
      university: "",
      faculty: "",
      specialinosti: "",
      // Validating inputs
      nameValidationError: "",
      emailValidationError: "",
      loginValidationError: "",
      passwordValidationError: "",
      passwordConfirmationError: "",
      phoneValidationError: "",
      // Activate Sign Up Button
      active: "inactive"
    };
  }
  universitiesDropdownToggle = () => {
    // this.activateSignUpButton()
    this.setState({
      universitiesDropdownShown: !this.state.universitiesDropdownShown,
    });
  };
  facultiesDropdownToggle = () => {
    // this.activateSignUpButton()
    this.setState({
      facultiesDropdownShown: !this.state.facultiesDropdownShown,
    });
  };
  specialinostiDropdownToggle = () => {
    // this.activateSignUpButton()
    this.setState({
      specialinostiDropdownShown: !this.state.specialinostiDropdownShown,
    });
  };
  selectUniversity = (university) => {
    // this.activateSignUpButton()
    this.setState({
      university: university,
    });
  };
  selectFaculty = (faculty) => {
    // this.activateSignUpButton()
    this.setState({
      faculty: faculty,
    });
  };
  selectSpecialinosti = (specialinosti) => {
    // this.activateSignUpButton()
    this.setState({
      specialinosti: specialinosti,
    });
  };
  // Validating inputs
  validateName = (name) => {
    if (name.length < 3) {
      this.setState({
        nameValidationError: "Your name must be longer than 2 characters!",
        active: "inactive"
      });
    } else if (!/^[a-z]+$/i.test(name))
      this.setState({
        nameValidationError:
          "Your name must not contain any characters that are not letters!",
        active: "inactive"
      });
    else {
      this.setState({
        nameValidationError: "",
        name: name
      });
      // this.activateSignUpButton()
    }
  };
  validateEmail = (email) => {
    if (email.length < 9) {
      this.setState({
        emailValidationError: "Your email address is too short or invalid!",
        active: "inactive"
      });
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      this.setState({
        emailValidationError: "Your email is not valid!",
        active: "inactive"
      });
    } else if (email.split("@")[1] === "" || email.split("@")[1].length < 4) {
      this.setState({
        emailValidationError: "Please provide a valid email address!",
        active: "inactive"
      });
    } else {
      this.setState({
        emailValidationError: "",
        email: email
      });
      // this.activateSignUpButton()
    }
  };
  validatePhone = (phone) => {
    if (phone.length !== 12) {
      this.setState({
        phoneValidationError: "Phone number is too short!",
        active: "inactive"
      });
    } else if (
      !/^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(
        phone
      )
    ) {
      this.setState({
        phoneValidationError:
          "Please enter a number in format +373-XX-XXX-XXX!",
        active: "inactive"
      });
    } else {
      this.setState({
        phoneValidationError: "",
        phone: phone
      });
      // this.activateSignUpButton()
    }
  };
  validateLogin = (login) => {
    // we will probably check all the existing logins and only allow the user to choose a unique one
    if (login.length < 3) {
      this.setState({
        loginValidationError: "Your login must be longer than 2 characters!",
        active: "inactive",
      });
    }
    else {
      this.setState({
        loginValidationError: "",
        login
      })
      // this.activateSignUpButton()

    }
  };
  validatePassword = (password) => {
    if (password.length < 8) {
      this.setState({
        passwordValidationError: "Your password must be at least 8 characters!",
        active: "inactive"
      })
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      this.setState({
        passwordValidationError: "Your password is too weak!",
        active: "inactive"
      })
    }
    else {
      this.setState({
        passwordValidationError: "",
        password: password
      })
      // this.activateSignUpButton()

    }
  }

  confirmPassword = password => {
    if (this.state.password.localeCompare(password)) {
      this.setState({
        passwordConfirmationError: "Passwords do not match!",
        active: "inactive"
      })
    }
    else {
      this.setState({
        passwordConfirmationError: ""
      })
      // this.activateSignUpButton()
    }
  }
  componentDidUpdate = (a, v) => {
    if (this.state.active !== "active") {
      if (
        this.state.name !== "" &&
        this.state.email !== "" &&
        this.state.phone !== "" &&
        this.state.password !== "" &&
        this.state.login !== "" &&
        this.state.university !== "" &&
        this.state.faculty !== "" &&
        this.state.specialinosti !== ""
      ) {
        this.setState({
          active: "active"
        })
      }
    }
  }
  render() {
    return (
      <div className="form-container">
        <form>
          <h2>Sign Up</h2>
          <label>
            Your Name
            {!!this.state.nameValidationError.length && (
              <span className="form-error">{this.state.nameValidationError}</span>
            )}
          </label>
          <input
            className={`input-${!!this.state.nameValidationError.length && "error"}`}
            placeholder="Jumbo..."
            onBlur={(e) => this.validateName(e.target.value)}
          />
          <label>
            Your Email
            {!!this.state.emailValidationError.length && (
              <span className="form-error">{this.state.emailValidationError}</span>
            )}
          </label>
          <input
            placeholder="something@gmail.com"
            onBlur={(e) => this.validateEmail(e.target.value)}
          />
          <label>
            Your Phone
            {!!this.state.phoneValidationError.length && (
              <span className="form-error">{this.state.phoneValidationError}</span>
            )}
          </label>
          <input
            placeholder="+37368327463"
            onBlur={(e) => this.validatePhone(e.target.value)}
          />
          <label>
            Your Login
            {!!this.state.loginValidationError.length && (
              <span className="form-error">{this.state.loginValidationError}</span>
            )}
          </label>
          <input
            placeholder="student123"
            onBlur={(e) => this.validateLogin(e.target.value)}
          />
          <label>
            Your Password
            {!!this.state.passwordValidationError.length && (
              <span className="form-error">{this.state.passwordValidationError}</span>
            )}
          </label>
          <input
            type="password"
            onBlur={(e) => this.validatePassword(e.target.value)}
          />
          <label>
            Confirm Your Password
            {!!this.state.passwordConfirmationError.length && (
              <span className="form-error">{this.state.passwordConfirmationError}</span>
            )}
          </label>
          <input
            type="password"
            onBlur={(e) => this.confirmPassword(e.target.value)}
          />
          <label>Select Your University</label>
          <OptionsSelection
            options={this.state.options.universities}
            selectedOption={this.state.university}
            showOptions={this.state.universitiesDropdownShown}
            toggleShowOptions={this.universitiesDropdownToggle}
            selectOption={this.selectUniversity}
          />
          {this.state.university && (
            <>
              <label>Select Your Faculty</label>
              <OptionsSelection
                options={this.state.options.UTMfaculties}
                selectedOption={this.state.faculty}
                showOptions={this.state.facultiesDropdownShown}
                toggleShowOptions={this.facultiesDropdownToggle}
                selectOption={this.selectFaculty}
              />
            </>
          )}
          {this.state.faculty && (
            <>
              <label>Специальность</label>
              <OptionsSelection
                options={this.state.options.UTMFCIMspecialinosti}
                selectedOption={this.state.specialinosti}
                showOptions={this.state.specialinostiDropdownShown}
                toggleShowOptions={this.specialinostiDropdownToggle}
                selectOption={this.selectSpecialinosti}
              />
            </>

          )}
          <button disabled={this.state.active !== "active"} className={`registration-button-${this.state.active}`} onClick={(e) => {
            e.preventDefault()
            axios.post(`${ipAddress}/auth/sign-up`, {
              name: this.state.name,
              username: this.state.login,
              password: this.state.password,
              email: this.state.email,
              phone: this.state.phone,
            }).then(() => {
              this.props.history.push("/sign-in")
            })
          }} >Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(RegistrationForm)