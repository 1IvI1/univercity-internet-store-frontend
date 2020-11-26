import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom"
import NewsFeed from './NewsFeed'
import '../../css/news/News.css'
import Filter from './Filter'

function News({ history }) {

  return (
    <>
      <Filter />
      <NewsFeed />
    </>
  )
}

export default withRouter(News)
