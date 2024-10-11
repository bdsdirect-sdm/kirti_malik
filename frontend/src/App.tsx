import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register'; 
import Login from './Agencylogin'; 
import JobSeekers from './jobSeeker';
import AgencyProfile from './agencyProfile';
import SeekerLogin from './seekerLogin';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginAgency" element={<Login />} />
          <Route path="/loginSeeker" element={<SeekerLogin />} />
          <Route path="/jobseekers" element={<JobSeekers />} />
          <Route path="/agency" element={<AgencyProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
