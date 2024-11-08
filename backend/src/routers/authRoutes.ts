import express from 'express'
import { loginDoctor, registerDoctor, verifyOtp } from '../controllers/authController'

const router=express.Router();

router.post('/register',registerDoctor)
router.post('/login',loginDoctor)
router.post('/verifyOtp',verifyOtp)

export default router;