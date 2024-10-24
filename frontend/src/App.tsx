import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './welcomePage';
import Login from './login'; 
import RetailerRegister from './retailerRegister';


const App: React.FC = () => {

  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/welcomePage" replace />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
             <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RetailerRegister/>} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
