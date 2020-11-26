import React from 'react'
import { useRouteMatch } from 'react-router-dom'

function MessagesChat() {
  const match = useRouteMatch()

    return (
        <div>
            MessagesChat {match.params.chatId}
        </div>
    )
}

export default MessagesChat
