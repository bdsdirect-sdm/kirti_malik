import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import config from '../config';

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
      const response = await axios.post(`${config.BASE_URL}/login`, values);
      alert('Login successful!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('doctorName', response.data.doctor.firstName);
      const DoctorId = response.data.doctor.id;
      localStorage.setItem('DoctorId', DoctorId);

      const type = response.data.doctor.userType;
      localStorage.setItem('userType', type);

      navigate(`/dashboard/${DoctorId}`);
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex p-0">
    
      {/* Left Section: Fixed */}
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white left-section">
        <img src="logo.png" alt="Logo" className="mb-4" style={{ width: '150px', height: '150px' }} />
        <h1>EYE REFER</h1>
      </div>

      {/* Right Section: Scrollable Form */}
      <div className="col-md-6 bg-light p-5">
        <h2 className="text-center mb-4">LOGIN</h2>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">User Email</label>
                <Field id="email" name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field id="password" name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3 text-end">
                <p className="text-muted" onClick={() => navigate('/forgotPassword')}>Forgot password?</p>
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>

              <div className="mt-3 text-center">
                <p>Don’t have an account? 
                  <button type="button" className="btn btn-info" onClick={() => navigate('/register')}>
                    Sign up
                  </button>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DoctorLogin;
