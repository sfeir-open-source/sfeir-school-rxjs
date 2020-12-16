import io from 'socket.io-client';

export const SOCKET = io('http://localhost:3000'); // replace this url by the ngrok url if you want to join existing chat
