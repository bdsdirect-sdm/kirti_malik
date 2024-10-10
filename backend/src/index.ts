import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import cors from 'cors';
import User from './models/user';
import userRouter from './routers/authRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000
;

app.use(cors());
app.use(express.json());
app.use('/api',userRouter)


sequelize.sync({force:false}).then(() => {
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
