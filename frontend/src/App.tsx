import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register'; 
import Login from './login'; 
import AgencyDashboard from './AgencyDashboard';
import JobSeekerDashboard from './jobSeekerDashboard';
import ChatForm from './chat';

const App: React.FC = () => {


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agencyDashboard" element={<AgencyDashboard />} />
          <Route path="/jobSeekersDashboard" element={<JobSeekerDashboard />} />
          <Route path="/chat/:senderId/:recieverId" element={<ChatForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
