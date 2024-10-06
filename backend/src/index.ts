

import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import cors from 'cors';
import User from './models/user'; 
import Address from './models/address';
import { Sequelize } from 'sequelize';
import userRouter from './router/userRouter';
import { apiDoc } from './swagger/swagger-docs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/api',userRouter)

// console.log(User === sequelize.models.User); 
// console.log(Address === sequelize.models.Address)

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

  apiDoc(app);