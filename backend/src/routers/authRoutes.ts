import express from 'express'
import { addPatient,getODDashboardData,
loginDoctor, registerDoctor, verifyOtp ,getMDdoctor,
referralPatientList,getMDdashboard,
getPatientbyDoctor,
addAppointment,
getAllAppointments,
getAppointmentsByPatient,
sendMessage,
viewPatient,
editPatient,
getChatHistory} from '../controllers/authController';
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
router.get('/patient/:DoctorId',getPatientbyDoctor)
router.post('/addAppointment/:DoctorId',addAppointment)
router.get('/getAppointments/:DoctorId',getAllAppointments)
router.get('/getAppointmentByPatient/:PatientId',getAppointmentsByPatient)
router.post('/sendMessage',sendMessage)
router.get('/viewPatient/:patientId',viewPatient)
router.put('/editPatient/:patientId',upload.single('MedicalDocuments'),editPatient)
router.post('/chat',sendMessage)
router.get('/chatHistory/:roomId',getChatHistory)

export default router;