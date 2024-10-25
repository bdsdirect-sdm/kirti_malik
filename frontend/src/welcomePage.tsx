// src/components/WelcomePage.tsx
import React from 'react';
import './welcomePage.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {

    const navigate=useNavigate();

    const handleRetailerClick=()=>{
        navigate('/register')
    }

  return (

    <div className="welcome-container">
      <h1>Welcome to the E-Commerce Website</h1>
      <div className="box-container">
        <div className="box retailer-box" onClick={handleRetailerClick}>
          <h2>Retailer</h2>
        </div>
        <div className="box customer-box">
          <h2>Customer</h2>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
