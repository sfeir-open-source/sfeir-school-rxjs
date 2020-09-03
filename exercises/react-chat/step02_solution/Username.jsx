import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { fromEvent } from 'rxjs'
import { filter, pluck } from 'rxjs/operators'
import { SOCKET } from './constants'
import './Username.css'

const Username = ({ error }) => {

  const usernameInput = useRef(null)

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
      const usernameSubscription = fromEvent(usernameInput.current, 'keyup').subscribe(event => {
        if(event.keyCode === 13) SOCKET.emit('new-user', { username: event.target.value })
      })
      return () => usernameSubscription.unsubscribe()
    }
  }, [])

  return (
    <React.Fragment>
      <div className="username-container">
        <h2>Choose a username</h2>
        <div>
          <input id="username-input" type="text" placeholder="Type your username here" ref={usernameInput} />
          <span className="info">Press Enter to confirm</span>
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