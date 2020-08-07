const express = require('express')
const app = express()

const http = require('http')
const server = http.Server(app)

const socketIO = require('socket.io')
const io = socketIO(server)

const port = process.env.PORT || 8080

const users = new Map();

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('new-message', (message) => io.emit('new-message', message))

  socket.on('new-user', (user) => {
    if (Array.from(users.values()).includes(user.username)) {
      socket.emit('new-user', { ok: false })
    } else {
      users.set(socket.id, user.username)
      socket.emit('new-user', { ok: true, username: user.username })
      io.emit('refresh-users', Array.from(users.values()))
      console.log(`${user.username} joined the chat.`)
      console.log(users)
    }
  })

  socket.on('disconnect', () => {
    console.log(`${users.get(socket.id)} left the chat.`);
    users.delete(socket.id);
    io.emit('refresh-users', Array.from(users.values()))
});
})

server.listen(port, () => {
  console.log(`started on port: ${port}`)
})