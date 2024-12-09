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
    
     
     <div className="col-md-6 d-flex justify-content-center align-items-center text-white left-section">
  <img src="logo.png" alt="Logo" className="me-3" style={{ width: '100px', height: '100px' }} />
  <h1 className='text-light'>EYE REFER</h1>
</div>

      <div className="col-md-6 bg-light p-5">
        <h2 className="text-center mb-4">Log In</h2>

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
                <Field id="email" name="email" type="email" className="form-control" placeholder="user email"/>
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field id="password" name="password" type="password" className="form-control" placeholder="password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3 text-end">
                <p className="text-muted" onClick={() => navigate('/forgotPassword')}>Forgot password?</p>
              </div>

              <button type="submit" className="btn btn-info w-100 text-light" >Login</button>

           <div className="mt-3 text-center">
  <div className="d-flex justify-content-center align-items-center">
    <p className="mb-0">Don’t have an account?</p>
    <p onClick={() => navigate('/register')} className="mb-0 ms-2 text-primary" style={{ cursor: 'pointer' }}>
      Sign up
    </p>
  </div>
</div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DoctorLogin;
