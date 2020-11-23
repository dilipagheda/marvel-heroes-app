import React from 'react'
import BackButton from './BackButton'
import '../styles/NotFound.scss'

const ServerError = () => {
  return (
    <div className="not-found-container">
      <BackButton />
      <h1>Hey! Something went wrong from server. Check console for error logs</h1>
    </div>
  )
}

export default ServerError
