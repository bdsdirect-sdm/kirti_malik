import React from 'react';
import {  Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required')
    .min(2, 'Must be 2 characters long'),
  last_name: Yup.string()
    .required('Last name is required')
    .min(2, 'Must be 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Must be the same as password')
    .required('Confirm password is required'),

  termsAndConditions: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const RegistrationForm: React.FC = () => {

  const navigate=useNavigate();
  const initialValues: UserData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: true,
  };

  const handleSubmit = async (values: UserData, {resetForm}:{resetForm:()=>void}) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', values);
      alert('Registration successful');
      console.log('Registration successful:', response.data);
     navigate("/login")

      if(response.status===200)
        {
          //  navigate('/login')
        }
        else{
            console.error(response.data.message || 'registration failed')
        }
    }
     catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
    resetForm();
  };
  

  return (
    <div className="container mt-5 bg-info">
      <h1>SIGN UP PAGE</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <Field className="form-control" name="first_name" type="text" />
              <ErrorMessage name="first_name" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <Field className="form-control" name="last_name" type="text" />
              <ErrorMessage name="last_name" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field className="form-control" name="email" type="text" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field className="form-control" name="password" type="password" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field className="form-control" name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>

            <div className="form-group form-check">
              <Field className="form-check-input" type="checkbox" name="termsAndConditions" />
              <label className="form-check-label">I accept the terms and conditions</label>
              <ErrorMessage name="termsAndConditions" component="div" className="text-danger" />
            </div>

    

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
