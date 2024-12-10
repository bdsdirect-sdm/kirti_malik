import { Server, Socket } from 'socket.io';
import { sendMessage, sendNotification } from './socketEvents';

const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('A new client connected:', socket.id);

    socket.on('joinRoom',(roomId)=>{
          socket.join(roomId);
            console.log(`user JOINED ROOOM ${roomId}`)
       })
      
     

    sendMessage(socket,io);
     
    sendNotification(socket,io);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export default setupSocket;
