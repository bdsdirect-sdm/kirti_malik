import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import userRouter from './router/userRegisterRouter';
import loginRouter from './router/userLoginRouter';
import router from './router/userProfileRouter';
import updateRouter from './router/updateRouter';
import { apiDoc } from './swagger/swagger-docs';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000
;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/users',loginRouter);
app.use('/api/users',router);
app.use('/api/users',updateRouter)

sequelize.sync().then(() => {
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

apiDoc(app);