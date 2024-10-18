import express from 'express';
import { getAgencies, loginUser, registerUser, updateJobSeekerStatus } from '../controllers/authController';
import { RegisterValidator } from '../middlewares/validator';
import { uploadMiddleware } from '../middlewares/multer';
import { getMessages,sendMessage } from '../controllers/chatController';

const router = express.Router();


router.post('/register', uploadMiddleware, RegisterValidator, registerUser);
router.post('/login', loginUser);
router.get('/agencies', getAgencies);
router.post('/updateJobSeekerStatus',updateJobSeekerStatus)
router.get('/getMessage/:userId/:agencyId', getMessages);
router.post('/sendMessage', sendMessage);


export default router;
