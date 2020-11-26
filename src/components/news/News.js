import React from 'react'
import { withRouter } from "react-router-dom"
import NewsFeed from './NewsFeed'
import '../../css/news/News.css'
import NewsFilter from './NewsFilter'

function News() {

  return (
    <>
      <NewsFilter />
      <NewsFeed />
    </>
  )
}

export default withRouter(News)
