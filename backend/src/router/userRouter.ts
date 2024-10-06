import express from 'express';
import  {addUser,Profile, updateProfile}  from '../controllers/userController';
import upload from '../middleware/fileUploader';



const userRouter = express.Router();

userRouter.post('/register',upload.single('profilePhoto'),addUser);
userRouter.get('/profile/:id',Profile)
userRouter.put('/profile/:id',upload.single('profilePhoto'), updateProfile);



export default userRouter;
