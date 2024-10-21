import express from 'express';
import sequelize from './config/db';
import router from './routers/authRouter';
import cors from 'cors';
import { apiDoc } from './swagger/swagger-doc';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/app',router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
apiDoc(router)
const port=process.env.PORT;


const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: '*',
   },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_message', (data) => {
     io.to(data.room).emit('receive_message', data);
  });

  socket.on('join_room', (room) => {
     socket.join(room);
     console.log(`User joined room: ${room}`);
  });

  socket.on('disconnect', () => {
     console.log('A user disconnected');
  });
});
const syncDatabase = async () => {
  try {
    
    await sequelize.sync({force:false}); 
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

syncDatabase();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});