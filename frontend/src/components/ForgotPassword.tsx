
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'; 
import config from '../config';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface ILoginInput {
  email: string;
  password: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: ILoginInput) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/login`, values);
      alert('Login successful!');
     
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('doctorName',response.data.doctor.firstName)
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <div className="register-container">
     
      <div className="left-section">
        <img src="logo.png" alt="Your Icon" className="logo" />
        <h1>EYE REFER</h1>
      </div>

    
      <div className="right-section">
        <h2>Forgot Password</h2>
       <Formik
  initialValues={{
    email: '',
    password: '',
  }}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
>
  {() => (
    <Form className="register-form">
      <div className="form-group">
        <label htmlFor="email">User Email</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage name="email" component="div" className="error-message" />
      </div>

      <div className='forgot-password'>
         <p onClick={()=>navigate('/login')}>back to login</p>

      </div>
     

      <button type="submit" className="submit-btn">submit</button>

     
    </Form>
  )}
</Formik>

      </div>
    </div>
  );
};

export default ForgotPassword;
