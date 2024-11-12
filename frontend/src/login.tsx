
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface ILoginInput {
  email: string;
  password: string;
}

const DoctorLogin = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: ILoginInput) => {
    try {
      const response = await axios.post('http://localhost:8080/app/login', values);
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
        <img src="" alt="Your Icon" className="logo" />
      </div>

    
      <div className="right-section">
        <h2>LOGIN</h2>
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
        <label htmlFor="email">Email</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage name="email" component="div" className="error-message" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field id="password" name="password" type="password" />
        <ErrorMessage name="password" component="div" className="error-message" />
      </div>

      <button type="submit" className="submit-btn">Login</button>

      <p className="login-signup-link">
        Don’t have an account?{" "}
        <button onClick={() => navigate('/register')} className="link-btn">
          Sign up
        </button>
      </p>
    </Form>
  )}
</Formik>

      </div>
    </div>
  );
};

export default DoctorLogin;
