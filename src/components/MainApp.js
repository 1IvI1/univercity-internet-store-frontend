import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom"

function MainApp({ history }) {

  useEffect(() => {
    if(!localStorage.getItem("access-token")) {
      history.push("/sign-in")
    }
  }, [history])

  return (
    <div>
      Main app
    </div>
  )
}

export default withRouter(MainApp)
