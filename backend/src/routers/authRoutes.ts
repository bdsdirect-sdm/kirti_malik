import express from 'express'
import { addPatient, getODDashboardData, loginDoctor, registerDoctor, verifyOtp } from '../controllers/authController'

const router=express.Router();

router.post('/register',registerDoctor)
router.post('/login',loginDoctor)
router.post('/verifyOtp',verifyOtp)
router.post('/addPatient',addPatient)
router.get('/oDdashboardData',getODDashboardData)

export default router;