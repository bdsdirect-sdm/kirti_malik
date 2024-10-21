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


const port=process.env.PORT;


const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: '*',
   },
});

io.on('connection', (socket) => {
  console.log('A user connected');


  socket.on('sendMessage', (message) => {
    console.log(`sending message :${message}`)
     io.emit('receiveMessage', message);
  });


  socket.on('disconnect', () => {
     console.log('A user disconnected');
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/app',router)
apiDoc(router)

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