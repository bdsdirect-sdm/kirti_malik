import express from 'express'
import { addPatient, loginDoctor, registerDoctor, verifyOtp } from '../controllers/authController'

const router=express.Router();

router.post('/register',registerDoctor)
router.post('/login',loginDoctor)
router.post('/verifyOtp',verifyOtp)
router.post('/addPatient',addPatient)

export default router;