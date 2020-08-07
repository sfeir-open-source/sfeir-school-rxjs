import * as io from 'socket.io-client'

export const SOCKET = io('http://localhost:8080') // replace this url by the ngrok url if you want to join existing chat