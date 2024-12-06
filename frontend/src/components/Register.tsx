import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  userType: Yup.string().required('User Type is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const handleInputChnage=(e:any)=>{
  const value=e.target.value;
  const re = /^[A-Za-z]+$/;
  if(value==='' || re.test(value))
  {
    
  }


}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  userType: 'OD' | 'MD';
  password: string;
  confirmPassword: string;
}

const DoctorRegister = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: IFormInput) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/register`, values);
      alert('Registration successful!, now you will be redirected to a verification page');
      localStorage.setItem('email', response.data.email);
      navigate('/verifyotp');
    } catch (error) {
      console.error(error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex p-0">
     
      <div className="col-md-6 left-section text-white d-flex flex-column justify-content-center align-items-center position-fixed vh-100">
        <img src="/logo.png" alt="Logo" className="mb-4" style={{ width: '150px', height: '150px' }} />
        <h1>EYE REFER</h1>
      </div>


      <div className="col-md-6 bg-light p-5 ms-auto" style={{ marginLeft: '50%' }}>
        <h2 className="text-center mb-4">SIGN UP</h2>

       
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
          <Form>
           <div className="mb-3 row">
  <div className="col-md-6">
    <label htmlFor="firstName" className="form-label">First Name</label>
    <Field id="firstName" name="firstName" type="text" className="form-control" placeholder="First name" onChange={handleInputChnage} />
    <ErrorMessage name="firstName" component="div" className="text-danger" />
  </div>

  <div className="col-md-6">
    <label htmlFor="lastName" className="form-label">Last Name</label>
    <Field id="lastName" name="lastName" type="text" className="form-control" placeholder="last name"/>
    <ErrorMessage name="lastName" component="div" className="text-danger" />
  </div>
</div>


            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field id="email" name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="userType" className="form-label">User Type</label>
              <Field as="select" name="userType" className="form-select">
                <option value="OD">OD</option>
                <option value="MD">MD</option>
              </Field>
              <ErrorMessage name="userType" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field id="password" name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field id="confirmPassword" name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-info w-100">Sign Up</button>

            <div className="mt-3 text-center">
              <p>Already have an account?</p>
              <button type="button" className="btn btn-info" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default DoctorRegister;
