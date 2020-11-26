import React from 'react'
import Header from './Header'
import Sidebar from "../components/news/Sidebar"
function HeaderBarsWrapper(props) {
  return (
    <div className="main-wrapper">
      <Header />
      <div className="news-container">
        <Sidebar />
        <div className="filter-and-news-feed-container" {...props}>
        </div>
      </div>
    </div>
  )
}

export default HeaderBarsWrapper
