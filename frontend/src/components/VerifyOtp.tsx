import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [email] = useState(localStorage.getItem('email')|| ''); 
  console.log("email====",email)
  const navigate=useNavigate()
  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${config.BASE_URL}/verifyOtp`, { email, otp });
      console.log("========!!!!",email,otp)
      alert('OTP verified successfully!');
      localStorage.removeItem('email')
      navigate('/login')
      
    } catch (error) {
      alert('Invalid OTP or OTP expired');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-5 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Verify Your OTP</h3>
        <p className="text-center text-muted mb-4">
          Please enter the OTP sent to your email to complete the registration.
        </p>

        <div className="form-group">
          <label htmlFor="otp" className="font-weight-bold">OTP</label>
          <input
            type="text"
            className="form-control"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          onClick={handleVerifyOtp}
          className="btn btn-primary btn-block mt-4"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
