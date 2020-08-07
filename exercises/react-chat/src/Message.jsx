import React from 'react'
import PropTypes from 'prop-types'
import './Message.css'

const Message = ({ author, content, key, time }) => {
  return (
    <div className="message-container" key={key}>
      <div className="message">{content}</div>
      <div className="author">{`${author} · ${time}`}</div>
    </div>
  )
}

export default Message

Message.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  key: PropTypes.string,
  time: PropTypes.string
}