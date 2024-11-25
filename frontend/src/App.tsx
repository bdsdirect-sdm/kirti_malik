import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './components/login';
import DoctorRegister from './components/Register';
import VerifyOtp from './components/VerifyOtp';
import AddPatient from './components/AddPatient';
import Layout from './components/Layout';
import ForgotPassword from './components/ForgotPassword';
import Patient from './components/Patient';
import MDdoctors from './components/MDdoctors';
import MainDashboard from './components/MDdashboard';
import AddAppointment from './components/AddAppointment';
import AppointmentPage from './components/AppointmentPage';
import ViewPatientAppointments from './components/ViewAppointment';
import Chat from './components/Chat';
import ViewPatient from './components/ViewPatient';
import EditPatient from './components/EditPatient';
import DoctorProfile from './components/DoctorProfile';
import Notification from './components/Notification';


import 'bootstrap-icons/font/bootstrap-icons.css';




const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<DoctorLogin />} />
      <Route path="/register" element={<DoctorRegister />} />
      <Route path='/verifyotp' element={<VerifyOtp/>}/>
      <Route path='forgotPassword' element={<ForgotPassword/>}/>
      
       <Route path='/' element={<Layout/>}>
          <Route path='dashboard/:DoctorId' element={<MainDashboard/>}/>
          <Route path='add-patient/:DoctorId' element={<AddPatient/>}/>
          <Route path='patients/:DoctorId' element={<Patient/>}/>
          <Route path='doctors' element={<MDdoctors/>}/>
           <Route path='addAppointment/:DoctorId' element={<AddAppointment/>}/>
           <Route path='appointment/:DoctorId' element={<AppointmentPage/>}/>
           <Route path='viewAppointment/:patientId' element={<ViewPatientAppointments/>}/>
           <Route path='chat' element={<Chat/>}/>
           <Route path='viewPatient/:patientId' element={<ViewPatient/>}/>
           <Route path='editPatient/:patientId' element={<EditPatient/>}/>
           <Route path='doctorProfile/:DoctorId' element={<DoctorProfile/>}/>
            <Route path='Notification' element={<Notification/>}/>


       </Route>
    </Routes>
  );
};

export default App;
