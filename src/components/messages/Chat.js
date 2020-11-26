import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Search } from './Search'

function MessagesChat() {
  const match = useRouteMatch()

    return (
        <div>
            <Search />
            MessagesChat {match.params.chatId}
        </div>
    )
}

export default MessagesChat
