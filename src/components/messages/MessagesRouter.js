import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MessagesChat from './MessagesChat'
import MessagesMain from './MessagesMain'

function MessagesRouter() {
  const match = useRouteMatch()
  console.log('match.url', match.url)
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <MessagesMain />
      </Route>
      <Route path={`${match.url}/chat/:chatId`}>
        <MessagesChat />
      </Route>
    </Switch>
  )
}

export default MessagesRouter
