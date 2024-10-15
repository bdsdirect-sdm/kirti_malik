import express from 'express';
import { getAgencies, loginUser, registerUser } from '../controllers/authController';
import { RegisterValidator } from '../middlewares/validator';
import { uploadMiddleware } from '../middlewares/multer';

const router = express.Router();


router.post('/register', uploadMiddleware, RegisterValidator, registerUser);
router.post('/login', loginUser);
router.get('/agencies', getAgencies);

export default router;
