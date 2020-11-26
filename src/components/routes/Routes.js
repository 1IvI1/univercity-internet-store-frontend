import React, { useCallback, useEffect, useState } from 'react'
import {
  Switch,
  Route,
  // withRouter,
  useHistory
} from 'react-router-dom'
import News from '../news/News'
import RegistrationForm from '../registration/RegistrationForm'
import SignInForm from '../registration/SignInForm'
import ForgotPassword from '../registration/ForgotPassword'
import JwtToken from '../../jwt/JwtToken'
import HeaderBarsWrapper from '../HeaderBarsWrapper'
import MessagesRouter from '../messages/MessagesRouter'
import Subscriptions from '../subscriptions/Subscriptions'
import { useDispatch } from 'react-redux'
import { userActions } from '../../redux/user/actions'

let jwtToken = null

export default function Routes() {
  const history = useHistory()

  const [canOpen, setCanOpen] = useState(null)

  const pushTo = path => {
    console.log('history', history)
    // history.push(path)
  }

  const dispatch = useDispatch()

  const setUser = useCallback((data) => {
    dispatch(userActions.setUser(data))
  }, [dispatch])

  useEffect(() => {
    jwtToken = new JwtToken(pushTo, setUser);
    setTimeout(() => {
      setCanOpen(true)
    }, 2000)
  }, [])

  return (
    // jwtToken ? 
    <Switch>
      <Route exact path="/news" render={() =>
        <HeaderBarsWrapper>
          <News />
        </HeaderBarsWrapper>
      } />
      <Route path="/messages" render={() =>
        <HeaderBarsWrapper>
          <MessagesRouter />
        </HeaderBarsWrapper>
      } />
      <Route exact path="/subscriptions" render={() =>
        <HeaderBarsWrapper>
          <Subscriptions />
        </HeaderBarsWrapper>
      } />
      <Route exact path="/sign-up">
        <RegistrationForm />
      </Route>
      <Route exact path="/sign-in">
        <SignInForm />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
    </Switch>
    // : <h1>Loading...</h1>
  )
}

export { jwtToken }