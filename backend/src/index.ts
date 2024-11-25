import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import sequelize from './config/db';
import router from './routers/authRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use('/app', router);

io.on('connect', (socket) => {
  console.log('A new client connected:', socket.id);

  socket.on('message', (message) => {
    console.log('Message received:', message);

    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const port = process.env.PORT || 8080;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

syncDatabase();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
