import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import MainApp from '../MainApp'
import RegistrationForm from '../registration/RegistrationForm'
import SignInForm from '../registration/SignInForm'
import ForgotPassword from '../registration/ForgotPassword'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={MainApp} />
      <Route path="/sign-up">
        <RegistrationForm />
      </Route>
      <Route path="/sign-in">
        <SignInForm />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
    </Switch>
  )
}

