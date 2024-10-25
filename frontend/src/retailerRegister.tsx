import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './retailerRegister.css';

interface Retailer {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  companyLogo: File | null;
  profileImage: File | null;
}

const RetailerRegister: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    companyLogo: null as File | null,
    profileImage: null as File | null,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    companyName: Yup.string().required('Company name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number is not valid')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    companyLogo: Yup.mixed().required('Company logo is required'),
    profileImage: Yup.mixed().required('Profile image is required'),
  });

  const handleSubmit = async (values: Retailer) => {
    const formData = new FormData();
    
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('companyName', values.companyName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    
    if (values.companyLogo) {
      formData.append('companyLogo', values.companyLogo);
    }
    if (values.profileImage) {
      formData.append('profileImage', values.profileImage);
    }

    try {
      const response = await fetch('http://localhost:8080/app/registerRetailer', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Retailer Registered:', data);
      
      if (response.ok) {
        navigate('/login');
      } else {
        console.error(data.errors);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <div className='header'>
        <h2>Register as Retailer</h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                <label>Company Name:</label>
                <Field type="text" name="companyName" />
                <ErrorMessage name="companyName" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Phone:</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Address:</label>
                <Field type="text" name="address" />
                <ErrorMessage name="address" component="div" className="error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Company Logo:</label>
                <input
                  type="file"
                  name="companyLogo"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue('companyLogo', event.currentTarget.files[0]);
                    }
                  }}
                />
                <ErrorMessage name="companyLogo" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Profile Image:</label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue('profileImage', event.currentTarget.files[0]);
                    }
                  }}
                />
                <ErrorMessage name="profileImage" component="div" className="error" />
              </div>
            </div>
            <button type="submit">Register</button>
          <button type="button" onClick={() => navigate('/login')} className="login-button" style={{ marginLeft: '10px' }}>
             Go to Login
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RetailerRegister;
