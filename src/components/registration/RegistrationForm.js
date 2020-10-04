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
      phoneConfirmationError: "",
    };
  }
  universitiesDropdownToggle = () => {
    this.setState({
      universitiesDropdownShown: !this.state.universitiesDropdownShown,
    });
  };
  facultiesDropdownToggle = () => {
    this.setState({
      facultiesDropdownToggle: !this.state.facultiesDropdownToggle,
    });
  };
  specialinostiDropdownToggle = () => {
    this.setState({
      specialinostiDropdownToggle: !this.state.specialinostiDropdownToggle,
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
      });
    }
  };
  validatePhone = (phone) => {
    if (phone.length !== 9) {
      this.setState({
        phoneValidationError: "Phone must contain exacly 9 digits!",
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
  render() {
    return (
      <div className="registration-form-container">
        <form>
          <label>
            Your Name
            {!!this.state.nameValidationError.length && (
              <span>{this.state.nameValidationError}</span>
            )}
          </label>
          <input
            placeholder="Mihai Perebinos..."
            onBlur={(e) => this.validateName(e.target.value)}
          />
          <label>
            Your Email
            {!!this.state.emailValidationError.length && (
              <span>{this.state.emailValidationError}</span>
            )}
          </label>
          <input
            placeholder="something@gmail.com"
            onBlur={(e) => this.validateEmail(e.target.value)}
          />
          <label>
            Your Phone
            {!!this.state.phoneValidationError.length && (
              <span>{this.state.phoneValidationError}</span>
            )}
          </label>
          <input
            placeholder="068327463"
            onBlur={(e) => this.validatePhone(e.target.value)}
          />
          <label>
            Your Login
            {!!this.state.loginValidationError.length && (
              <span>{this.state.loginValidationError}</span>
            )}
          </label>
          <input
            placeholder="student123"
            onBlur={(e) => this.validateLogin(e.target.value)}
          />
          <label>
            Your Password
            {!!this.state.passwordValidationError.length && (
              <span>{this.state.passwordValidationError}</span>
            )}
          </label>
          <input
            type="password"
            onBlur={(e) => this.validatePassword(e.target.value)}
          />
          <label>
            Confirm Your Password
            {!!this.state.passwordConfirmationError.length && (
              <span>{this.state.passwordConfirmationError}</span>
            )}
          </label>
          <input
            type="password"
            onBlur={(e) => this.confirmPassword(e.target.value)}
          />
          <label>Select Your University</label>
          <OptionsSelection
            options={this.state.universities}
            selectedOption={this.state.options.universities[0].name}
            showOptions={this.state.universitiesDropdownShown}
            toggleShowOptions={this.universitiesDropdownToggle}
            selectOption={this.selectUniversity}
          />
          <label>Select Your Faculty</label>
          {this.state.university.length !== 0 ? (
            <OptionsSelection
              options={this.state.UTMfaculties}
              selectedOption={this.state.UTMfaculties[0]}
              showOptions={this.state.facultiesDropdownShown}
              toggleShowOptions={this.facultiesDropdownToggle}
              selectOption={this.selectFaculty}
            />
          ) : (
            <div className="university-not-selected">
              Select Your University First
            </div>
          )}
          <label>Специальность</label>
          {this.state.faculty.length !== 0 ? (
            <OptionsSelection
              options={this.state.UTMFCIMspecialinosti}
              selectedOption={this.state.UTMFCIMspecialnosti[0]}
              showOptions={this.state.specialinostiDropdownShown}
              toggleShowOptions={this.specialinostiDropdownToggle}
              selectOption={this.selectSpecialinosti}
            />
          ) : (
            <div className="university-not-selected">
              Select Your Faculty First
            </div>
          )}
        </form>
      </div>
    );
  }
}
