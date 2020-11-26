import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { getLastMessages } from '../../services/MessagesService'
import { Search } from './Search'
import '../../css/messages/Dialogs.css'
import { ChatLink } from './ChatLink'
import { Link } from 'react-router-dom'
// import axios from 'axios'

function Dialogs() {
  const [users, setUsers] = useState([
    {
      id: Math.random(),
      name: 'John Doe'
    },
    {
      id: Math.random(),
      name: 'Someone Else'
    },
    {
      id: Math.random(),
      name: 'Another Someone Else'
    }
  ])
  const [messages, setMessages] = useState([
    {
      id: 1,
      isRead: true,
      date: new Date(2019, 4, 12, 4, 43, 23),
      author: users[0],
      messageText: 'Bla bla bla'
    },
    {
      id: 2,
      isRead: false,
      date: new Date(2020, 4, 12, 4, 43, 23),
      author: users[2],
      messageText: 'Bla bla bla'
    },
    {
      id: 3,
      isRead: true,
      date: new Date(2015, 4, 12, 4, 43, 23),
      author: users[1],
      messageText: 'Bla bla bla'
    },
    {
      id: 4,
      isRead: false,
      date: new Date(2017, 4, 12, 4, 43, 23),
      author: users[1],
      messageText: 'Bla bla bla'
    },
  ])
  const [threads, setThreads] = useState()

  // const user = useSelector(state => state.UserStore.user)

  useEffect(() => {
    // getLastMessages(user.id).then(response => {
    //   console.log('response.data', response.data)
    //   setMesages(response.data)
    // })
  }, [])

  // filter messages and make threads by message's author
  useEffect(() => {
    let threadsMap = new Map(), threadsArray = []
    
    users.map(user => {
      let userMessages = messages.filter(message => {
        return message.author.name === user.name
      }).sort((a, b) => new Date(b.date) - new Date(a.date))
      threadsMap.set(user.name, userMessages)
    })

    threadsMap.forEach(thread => {
      threadsArray.push(thread)
    })

    let latestMessages = []
    threadsArray.forEach(thread => latestMessages.push(thread.filter((message, index) => index === 0)))
    let read = []
    let unread = []

    latestMessages.map((message, index) => {
      if(message[0].isRead) {
       read.push(message[0])
      }
      else {
        unread.push(message[0])
      }
    })

    let sortedMessages = [...unread, ...read]

    setThreads(sortedMessages)
  }, [])

  // console.log('new messages', newMessages)

  return (
    <div className='dialogs-container'>
      <Search />
      <div className='chat-link-wrapper' onClick={() => console.log('i go to the chat')}>
        {
          threads && threads.map(thread => <ChatLink to={thread.id} thread={thread} key={Math.random()}/>)
        }
      </div>
    </div>
  )
}

export default Dialogs
