import React, { useState } from 'react'
import '../css/header/Header.css'
import search from '../assets/icons/search.svg'
import add from '../assets/icons/add.svg'
import UserAvatar from './UserAvatar'
import axios from "axios"
import { ipAddress } from '../constants'
import { useHistory } from 'react-router-dom'
import { parseJWT } from '../helpers'
import { jwtToken } from './routes/Routes'

export default function Header() {

  const [searchQuery, setSearchQuery] = useState('')
  const history = useHistory()

  const logOut = () => {
    const tokenParsed = parseJWT(localStorage.getItem("access-token"))
    axios.put(`${ipAddress}/auth/logout`, {
      data: {
        id: tokenParsed.id
      }
    }).then(response => {
      console.log('response', response)
      localStorage.removeItem("access-token")
      localStorage.removeItem("refresh-token")
      history.push("/sign-in")
      jwtToken.clearRefreshInterval()
      delete axios.defaults.headers["access-token"]
    }).catch(err => {
      console.log('err', err)
    })
  }

  return (
    <div className="header-container">
      <div>
        <div className="logo"></div>
        <div className="search-container">
          <img src={search} alt="Search Icon" className="search-icon" />
          <input
            className="search"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="add-new-post-button"
        // onClick={() => showAddPostModal()}
        >
          <img src={add} alt="Add Icon" className="add-icon" />
                    New Post</button>
        <UserAvatar />
        <button
          className="log-out-button"
          onClick={logOut}
        >Log Out</button>
      </div>
    </div>
  )
}