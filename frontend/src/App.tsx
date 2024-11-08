import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './login';
import DoctorRegister from './doctorRegister';
import VerifyOtp from './verifyOtp';


const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<DoctorLogin />} />
      <Route path="/register" element={<DoctorRegister />} />
      <Route path='/verifyotp' element={<VerifyOtp/>}/>
    </Routes>
  );
};

export default App;
