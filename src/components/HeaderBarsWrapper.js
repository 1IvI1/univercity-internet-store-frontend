import React from 'react'
import Header from './Header'
import Sidebar from './sidebar/Sidebar'

function HeaderBarsWrapper(props) {
  return (
    <div className="main-wrapper">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content-container" {...props} />
      </div>
    </div>
  )
}

export default HeaderBarsWrapper
