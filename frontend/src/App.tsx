import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './login';
import DoctorRegister from './Register';
import VerifyOtp from './VerifyOtp';
import ODdashboard from './ODdashboard';
import AddPatient from './addPatient';
import Layout from './Layout';


const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<DoctorLogin />} />
      <Route path="/register" element={<DoctorRegister />} />
      <Route path='/verifyotp' element={<VerifyOtp/>}/>
      
     

         { /*routes for the dashboard page */}
       <Route path='/' element={<Layout/>}>
          <Route path='dashboard' element={<ODdashboard/>}/>
          <Route path='add-patient' element={<AddPatient/>}/>
          

       </Route>
    </Routes>
  );
};

export default App;
