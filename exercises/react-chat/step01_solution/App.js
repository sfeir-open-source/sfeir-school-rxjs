import React, { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { getHeureMinutes } from './helpers'
import { SOCKET } from './constants'
import Messages from './Messages'
import Username from './Username'
import Users from './Users'
import './App.css'


const observable = new Observable(subscriber => {
  SOCKET.on('new-message', (message) => {
    subscriber.next(message)
  })
})

const usersObservable = new Observable(subscriber => {
  SOCKET.on('refresh-users', (users) => {
    subscriber.next(users)
  })
})

const usernameObservable = new Observable(subscriber => {
  SOCKET.on('new-user', (response) => {
    if (response.ok) {
      subscriber.next(response)
    } else {
      subscriber.error('This username is already taken.')
    }
  })
})

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
    const subscription = observable.subscribe(message => setMessages([...messages, message]))

    return () => subscription.unsubscribe()
  }, [messages])

  useEffect(() => {
    const subscription = usersObservable.subscribe(users => {
      setUsers(users)
    })

    return () => subscription.unsubscribe()
  })

  useEffect(() => {
    const subscription = usernameObservable.subscribe({
      next (response) { setUsername(response.username) },
      error (errorMsg) { setError(errorMsg) }
    })

    return () => subscription.unsubscribe()
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
