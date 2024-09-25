import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import userRouter from './router/userRegisterRouter';
import loginRouter from './router/userLoginRouter';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/users',loginRouter);

sequelize.sync().then(() => {
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

