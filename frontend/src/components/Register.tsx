import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './style.css'; 
import { useNavigate } from 'react-router-dom';
import config from '../config';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  userType: Yup.string().required('User Type is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface IFormInput {
  firstName: string;
  lastName: string; 
  email: string;
  userType: 'OD' | 'MD';
  password: string;
  confirmPassword: string;
}

const DoctorRegister = () => {

    const navigate=useNavigate()
  const onSubmit = async (values: IFormInput) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/register`, values);
      alert('Registration successful!, now you will be redirected to a verification page');
      const user=response.data.email;
      console.log("=================",user)
      localStorage.setItem('email',response.data.email)
      navigate('/verifyotp')

    } catch (error) {
      console.error(error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="register-container">
    
      <div className="left-section">
        <img src="/logo.png" alt="Your Icon" className="logo" />
        <h1>EYE REFER</h1>
      </div>

      <div className="right-section">
        <h2>SIGN UP</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            userType: 'OD',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="register-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" type="text" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" type="text" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <Field as="select" name="userType">
                <option value="OD">OD</option>
                <option value="MD">MD</option>
              </Field>
              <ErrorMessage name="userType" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field id="confirmPassword" name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-btn">Sign Up</button>

               <div className="login-link">
              <p>Already have an account?</p><button type="button"  className="login-btn" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default DoctorRegister;
