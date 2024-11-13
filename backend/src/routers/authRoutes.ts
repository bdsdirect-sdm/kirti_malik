import express from 'express'
import { addPatient,getODDashboardData,
loginDoctor, registerDoctor, verifyOtp ,getMDdoctor,
referralPatientList,getMDdashboard,
getPatientbyDoctor} from '../controllers/authController';
import { upload } from '../middlewares/multer';

const router=express.Router();

router.post('/register',registerDoctor)
router.post('/login',loginDoctor)
router.post('/verifyOtp',verifyOtp)
router.post('/addPatient',upload.single('MedicalDocuments'),addPatient)
router.get('/oDdashboardData',getODDashboardData)
router.get('/MDdashboardData',getMDdashboard);
router.get('/getmddoctor',getMDdoctor)
router.get('/referralpatientlist',referralPatientList)
router.get('/patient/:DoctorId',getPatientbyDoctor)

export default router;