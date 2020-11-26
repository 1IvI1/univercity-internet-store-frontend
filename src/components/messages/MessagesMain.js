import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLastMessages } from '../../services/MessagesService'

function MessagesMain() {
  const [messages, setMesages] = useState(null)
  const user = useSelector(state => state.UserStore.user)

  useEffect(() => {
    // getLastMessages(user.id).then(response => {
    //   console.log('response.data', response.data)
    //   setMesages(response.data)
    // })
  }, [])

  return (
    <div>
      MessagesMain
    </div>
  )
}

export default MessagesMain
