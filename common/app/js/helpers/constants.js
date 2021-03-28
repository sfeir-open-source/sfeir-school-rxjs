import io from 'socket.io-client';

// replace this url by the ngrok url if you want to join an existing chat
export const SOCKET = io('http://localhost:3000');
