import React, { Component } from "react";
import OptionsSelection from "./OptionsSelection";
import "../../css/registration/Registration.css";

export default class RegistrationForm extends Component {
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
    };
  }
  universitiesDropdownToggle = () => {
    this.setState({
      universitiesDropdownShown: !this.state.universitiesDropdownShown,
    });
  };
  facultiesDropdownToggle = () => {
    this.setState({
      facultiesDropdownShown: !this.state.facultiesDropdownShown,
    });
  };
  specialinostiDropdownToggle = () => {
    this.setState({
      specialinostiDropdownShown: !this.state.specialinostiDropdownShown,
    });
  };
  selectUniversity = (university) => {
    console.log(university);
    this.setState({
      university: university,
    });
  };
  selectFaculty = (faculty) => {
    console.log(faculty);
    this.setState({
      faculty: faculty,
    });
  };
  selectSpecialinosti = (specialinosti) => {
    console.log(specialinosti);
    this.setState({
      specialinosti: specialinosti,
    });
  };
  // Validating inputs
  validateName = (name) => {
    if (name.length < 3) {
      console.log(!name.match(/^[A-Za-z]+/));
      this.setState({
        nameValidationError: "Your name must be longer than 2 characters!",
      });
    } else if (!/^[a-z]+$/i.test(name))
      this.setState({
        nameValidationError:
          "Your name must not contain any characters that are not letters!",
      });
    else
      this.setState({
        nameValidationError: "",
        name: name
      });
  };
  validateEmail = (email) => {
    if (email.length < 9) {
      this.setState({
        emailValidationError: "Your email address is too short or invalid!",
      });
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      this.setState({
        emailValidationError: "Your email is not valid!",
      });
    } else if (email.split("@")[1] === "" || email.split("@")[1].length < 4) {
      this.setState({
        emailValidationError: "Please provide a valid email address!",
      });
    } else {
      this.setState({
        emailValidationError: "",
        email: email
      });
    }
  };
  validatePhone = (phone) => {
    if (phone.length !== 12) {
      this.setState({
        phoneValidationError: "Phone number is too short!",
      });
    } else if (
      !/^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(
        phone
      )
    ) {
      this.setState({
        phoneValidationError:
          "Please enter a number in format +373-XX-XXX-XXX!",
      });
    } else {
      this.setState({
        phoneValidationError: "",
        phone: phone
      });
    }
  };
  validateLogin = (login) => {
    // we will probably check all the existing logins and only allow the user to choose a unique one
    if (login.length < 3) {
      this.setState({
        loginValidationError: "Your login must be longer than 2 characters!",
      });
    }
  };
  validatePassword = (password) => {
    if (password.length < 8) {
      this.setState({
        passwordValidationError: "Your password must be at least 8 characters!"
      })
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      this.setState({
        passwordValidationError: "Your password is too weak!"
      })
    }
    else {
      this.setState({
        passwordValidationError: "",
        password: password
      })
    }
  }
  confirmPassword = password => {
    if (this.state.password !== password) {
      this.setState({
        passwordConfirmationError: "Passwords do not match!"
      })
    }
    else {
      this.setState({
        passwordConfirmationError: ""
      })
    }
  }
  render() {
    return (
      <div className="registration-form-container">
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
            placeholder="Mihai Perebinos..."
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
            selectedOption={this.state.options.universities[0].name}
            showOptions={this.state.universitiesDropdownShown}
            toggleShowOptions={this.universitiesDropdownToggle}
            selectOption={this.selectUniversity}
          />
          {this.state.university && (
            <>
            <label>Select Your Faculty</label>
            <OptionsSelection
              options={this.state.options.UTMfaculties}
              selectedOption={this.state.options.UTMfaculties[0]}
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
              selectedOption={this.state.options.UTMFCIMspecialinosti[0]}
              showOptions={this.state.specialinostiDropdownShown}
              toggleShowOptions={this.specialinostiDropdownToggle}
              selectOption={this.selectSpecialinosti}
            />
            </>
          
          )}
        </form>
      </div>
    );
  }
}
