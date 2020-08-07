import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import './Messages.css'

const Messages = ({ messages, username }) => {

  useEffect(() => {
    const container = document.getElementById('messages-container')
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  return (
    <div id="messages-container" className="messages-container">
      {messages.map((message, index) =>
        <Message key={`${username}_${index}`} {...message} />
      )}
  </div>
  )
}

export default Messages

Messages.propTypes = {
  messages: PropTypes.array,
  username: PropTypes.string
}
