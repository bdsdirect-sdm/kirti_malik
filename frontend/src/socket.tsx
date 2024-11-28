import io from 'socket.io-client';
const SOCKET_URL='http://localhost:8000';

let socket=io(SOCKET_URL);
export default socket;