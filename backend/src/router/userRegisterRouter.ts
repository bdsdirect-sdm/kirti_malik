import express from 'express';
import  registerUser  from '../controllers/userRegisterController';

const userRouter = express.Router();
console.log('router');
userRouter.post('/register', registerUser);

export default userRouter;
