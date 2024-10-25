import express from 'express';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/eCommerceWebsite
import http from 'http';
import sequelize from './config/db';
import router from './routers/authRouter';
import cors from 'cors';
import { apiDoc } from './swagger/swagger-doc';
<<<<<<< HEAD
=======
import path from 'path';
import { setupSocket } from './sockets/socketSetup';
import { setupSocketEvents } from './sockets/setupsocketEvents';

const app = express();

//to setup socket
const server=http.createServer(app);
const io=setupSocket(server);
setupSocketEvents(io);


app.use(cors());
app.use(express.json());
=======
import sequelize from './config/db';
import cors from 'cors';
import http from 'http';

>>>>>>> origin/eCommerceWebsite
import path from 'path';
import { setupSocket } from './sockets/socketSetup';
import { setupSocketEvents } from './sockets/setupsocketEvents';

const app = express();



app.use(cors());
app.use(express.json());
<<<<<<< HEAD
=======


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

>>>>>>> origin/eCommerceWebsite
>>>>>>> origin/eCommerceWebsite
const port=process.env.PORT;



<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/eCommerceWebsite
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/app',router)
apiDoc(router)

<<<<<<< HEAD

=======
//to sync the database
=======


>>>>>>> origin/eCommerceWebsite
>>>>>>> origin/eCommerceWebsite
const syncDatabase = async () => {
  try {
    
    await sequelize.sync({force:false}); 
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};
<<<<<<< HEAD
syncDatabase();



app.listen(port, () => {
=======
<<<<<<< HEAD
syncDatabase();



server.listen(port, () => {
=======

syncDatabase();

app.listen(port, () => {
>>>>>>> origin/eCommerceWebsite
>>>>>>> origin/eCommerceWebsite
  console.log(`Server is running on port ${port}`);
});