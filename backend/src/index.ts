import express from 'express';
import http from 'http';
import sequelize from './config/db';
import router from './routers/authRouter';
import cors from 'cors';
import { apiDoc } from './swagger/swagger-doc';
import path from 'path';
import { setupSocket } from './sockets/socketSetup';
import { setupSocketEvents } from './sockets/setupsocketEvents';

const app = express();



app.use(cors());
app.use(express.json());
const port=process.env.PORT;



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



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});