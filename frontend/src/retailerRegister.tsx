import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './retailerRegister.css';

const RetailerRegister: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number is not valid')
      .required('Phone number is required'),
    profile: Yup.mixed().required('Profile image is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log('Retailer Registered:', values);
    // Registration logic here (API call, etc.)
    navigate('/dashboard');
  };

  return (
    <div className="register-container">
     
      <div className='header'>
         <h2>Register as Retailer</h2>

      </div>

     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-row">
              <div className="form-field">
                <label>First Name:</label>
                <Field type="text" name="firstName" />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Last Name:</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Phone:</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Profile Image:</label>
                <input
                  type="file"
                  name="profile"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue('profile', event.currentTarget.files[0]);
                    }
                  }}
                />
                <ErrorMessage name="profile" component="div" className="error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Confirm Password:</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RetailerRegister;
