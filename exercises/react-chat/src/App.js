import React, { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { getHourTime } from './helpers'
import { SOCKET } from './constants'
import Messages from './Messages'
import Username from './Username'
import Users from './Users'
import './App.css'


const messages$= {}

const users$= {}

const username$= {}

const App = () => {
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])

  const handleChange = e => setText(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    SOCKET.emit('new-message', { author: username, content: text, time: getHourTime() });
    setText('')
  }

  const subscribeToMessages = () => {
    // subscribe to messages
   return () => { 
    // and don't forget to unsubscribe here!
    }
  }

  const subscribeToUsers = () => {
    // subscribe to users
   return () => { 
    // and don't forget to unsubscribe here!
    }
  }

  const subscribeToUsername = () => {
    // subscribe to username
    return () => { 
    // and don't forget to unsubscribe here!
    }
  }

  useEffect(subscribeToMessages , [messages])

  useEffect(subscribeToUsers, [])

  useEffect(subscribeToUsername)

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
