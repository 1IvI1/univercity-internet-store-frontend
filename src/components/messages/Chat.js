import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Search } from './Search'

function MessagesChat() {
  const match = useRouteMatch()
  const [messages, setMessages] = useState([
    {
      id: 1,
      isRead: true,
      date: new Date(2019, 4, 12, 4, 43, 23),
      author: 'Ben Adams',
      messageText: 'Bla bla bla'
    },
    {
      id: 2,
      isRead: false,
      date: new Date(2020, 4, 12, 4, 43, 23),
      author: 'Ben Adams',
      messageText: 'Bla bla bla'
    },
    {
      id: 3,
      isRead: true,
      date: new Date(2015, 4, 12, 4, 43, 23),
      author: 'Ben Adams',
      messageText: 'Bla bla bla'
    },
    {
      id: 4,
      isRead: false,
      date: new Date(2017, 4, 12, 4, 43, 23),
      author: 'Ben Adams',
      messageText: 'Bla bla bla'
    },
  ])
    return (
        <div className='chat-container'>
            <Search />
            <div className='messages-container'>
                
            </div>
        </div>
    )
}

export default MessagesChat
