import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import './Messages.css'

const Messages = ({ messages, username }) => {
  const container = useRef(null)

  useEffect(() => {
    if (container.current) container.current.scrollTop = container.current.scrollHeight
  }, [messages])

  return (
    <div id="messages-container" className="messages-container" ref={container}>
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
