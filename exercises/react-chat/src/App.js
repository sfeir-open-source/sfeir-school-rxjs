import React, { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { getHeureMinutes } from './helpers'
import { SOCKET } from './constants'
import Messages from './Messages'
import Username from './Username'
import Users from './Users'
import './App.css'


const messagesObservable = {}

const usersObservable = {}

const usernameObservable = {}

const App = () => {
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])

  const handleChange = e => setText(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    SOCKET.emit('new-message', { author: username, content: text, time: getHeureMinutes() });
    setText('')
  }

  useEffect(() => {
    // subscribe to messages
    // and don't forget to unsubscribe !
  })

  useEffect(() => {
    // subscribe to users
    // and don't forget to unsubscribe !
  })

  useEffect(() => {
    // subscribe to username
    // and don't forget to unsubscribe !
  })

  return (
    <div className="App">
      <div className="header"><h1>Welcome to RxJS-chat !</h1></div>
      {!username && <Username error={error} />}

      {username &&
      <div className="screen">
        <Users users={users} />
        <div className="chatbox">
          <Messages messages={messages} username={username} />
          <div className="text-container">
            <form id="myForm" onSubmit={handleSubmit}>
              <input id="text-input" type="text" placeholder="Type your text here" value={text} onChange={handleChange} />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default App
