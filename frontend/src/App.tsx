import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './login';
import DoctorRegister from './Register';
import VerifyOtp from './VerifyOtp';
// import ODdashboard from './ODdashboard';
import AddPatient from './AddPatient';
import Layout from './Layout';
import ForgotPassword from './ForgotPassword';
import Patient from './Patient';
import MDdoctors from './MDdoctors';
import MainDashboard from './MainDashboard';
import AddAppointment from './AddAppointment';



const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<DoctorLogin />} />
      <Route path="/register" element={<DoctorRegister />} />
      <Route path='/verifyotp' element={<VerifyOtp/>}/>
      <Route path='forgotPassword' element={<ForgotPassword/>}/>
      
         { /*routes for the dashboard page */}
       <Route path='/' element={<Layout/>}>
          <Route path='dashboard/:DoctorId' element={<MainDashboard/>}/>
          <Route path='add-patient/:DoctorId' element={<AddPatient/>}/>
          <Route path='patients' element={<Patient/>}/>
          <Route path='doctors' element={<MDdoctors/>}/>
           <Route path='addAppointment/:DoctorId' element={<AddAppointment/>}/>

       </Route>
    </Routes>
  );
};

export default App;
