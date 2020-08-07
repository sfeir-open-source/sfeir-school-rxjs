import React, { useEffect, useState, useRef } from 'react'
import { Observable, fromEvent } from 'rxjs'
import { distinctUntilChanged, filter, pluck, throttleTime } from 'rxjs/operators'
import { getHeureMinutes } from './helpers'
import { SOCKET } from './constants'
import Messages from './Messages'
import Username from './Username'
import Users from './Users'
import './App.css'


const messagesObservable = new Observable(subscriber => {
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
  const textInput = useRef(null)

  const handleChange = e => setText(e.target.value)

  useEffect(() => {
    const subscription = messagesObservable.subscribe(message => setMessages([...messages, message]))

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

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus()
      const inputSubscription = fromEvent(textInput.current, 'keyup').pipe(
        filter(e => e.keyCode === 13),
        throttleTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((message) => message.trim().length > 0),
      ).subscribe(value => {
        SOCKET.emit('new-message', { author: username, content: value, time: getHeureMinutes() })
        setText('')
      })
      return () => inputSubscription.unsubscribe()
    }
  }, [username])

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
            <input id="text-input" type="text" placeholder="Type your text here" value={text} ref={textInput} onChange={handleChange} />
            <span className="info">Press Enter to send your message</span>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default App
