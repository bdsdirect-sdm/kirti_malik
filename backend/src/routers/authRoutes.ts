import express from 'express'
import { addPatient,getODDashboardData,
loginDoctor, registerDoctor, verifyOtp ,getMDdoctor,
referralPatientList,getMDdashboard,
getPatientbyDoctor,
addAppointment,
getAllAppointments,
getAppointmentsByPatient,
viewPatient,
editPatient,
getChatHistory,
getNotification,
addStaff,
getStaff,
editAppointment,
cancelAppointment,
completeAppointment,
getDoctor,
generateCSV,
generatePDF,
doctorAddress} from '../controllers/authController';
import { upload } from '../middlewares/multer';

const router=express.Router();

router.post('/register',registerDoctor)
router.post('/doctorAddress/:doctorId',doctorAddress)
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
router.put('/editAppointment/:PatientId',editAppointment)
router.get('/viewPatient/:patientId',viewPatient)
router.put('/editPatient/:patientId',upload.single('MedicalDocuments'),editPatient)
router.get('/chatHistory/:roomId',getChatHistory)
router.get('/getNotification/:DoctorId',getNotification)
router.post('/addStaff/:DoctorId',addStaff)
router.get('/getStaff/:DoctorId',getStaff)
router.put('/cancelAppointment/:id',cancelAppointment)
router.put('/completeAppointment/:id',completeAppointment)
router.get('/getDoctor/:DoctorId',getDoctor)
router.get('/generateCSV',generateCSV)
router.get('/generatePDF/:patientId',generatePDF);


export default router;