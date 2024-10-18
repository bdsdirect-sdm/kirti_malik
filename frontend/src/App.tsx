import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register'; 
import Login from './login'; 
import AgencyDashboard from './AgencyDashboard';
import JobSeekerDashboard from './jobSeekerDashboard';
import ChatComponent from './chat';

const App: React.FC = () => {
 
  const userId = localStorage.getItem('userId') || 'defaultUserId'; 
  const agencyId = localStorage.getItem('agencyId') || 'defaultAgencyId';
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agencyDashboard" element={<AgencyDashboard />} />
          <Route path="/jobSeekersDashboard" element={<JobSeekerDashboard />} />
          <Route path="/chat/:userId/:agencyId" element={<ChatComponent userId={userId} agencyId={agencyId} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
