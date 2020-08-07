import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SOCKET } from './constants'
import './Username.css'

const Username = ({ error }) => {
  const [username, setUsername] = useState('')

  const handleChange = e => setUsername(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    SOCKET.emit('new-user', { username: username })
  }

  return (
    <React.Fragment>
      <div className="username-container">
        <h2>Choose a username</h2>
        <div>
          <form id="myForm" onSubmit={handleSubmit}>
            <input id="username-input" type="text" value={username} placeholder="Type your username here" onChange={handleChange} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </React.Fragment>
  )
}

export default Username

Username.propTypes = {
  error: PropTypes.string
}