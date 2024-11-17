import express from 'express'
import { addPatient,getODDashboardData,
loginDoctor, registerDoctor, verifyOtp ,getMDdoctor,
referralPatientList,getMDdashboard,
<<<<<<< HEAD
getPatientbyDoctor,
addAppointment} from '../controllers/authController';
=======
getPatientByDoctor,
addAppointment,
getAppointments} from '../controllers/authController';
>>>>>>> 8cb38fd8 (add apointment done)
import { upload } from '../middlewares/multer';

const router=express.Router();

router.post('/register',registerDoctor)
router.post('/login',loginDoctor)
router.post('/verifyOtp',verifyOtp)
router.post('/addPatient/:DoctorId',upload.single('MedicalDocuments'),addPatient)
router.get('/oDdashboardData',getODDashboardData)
router.get('/MDdashboardData/:DoctorId',getMDdashboard);
router.get('/getmddoctor',getMDdoctor)
router.get('/referralpatientlist',referralPatientList)
<<<<<<< HEAD
router.get('/patient/:DoctorId',getPatientbyDoctor)
router.post('/addAppointment',addAppointment)
=======
router.get('/patient/:DoctorId',getPatientByDoctor)
router.post('/addAppointment',addAppointment)
router.get('/getAppointments/:DoctorId',getAppointments)
>>>>>>> 8cb38fd8 (add apointment done)

export default router;