import React from 'react'
import BackButton from './BackButton'
import '../styles/NotFound.scss'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <BackButton />
      <h1>Sorry! This page is not found!</h1>
    </div>
  )
}

export default NotFound
