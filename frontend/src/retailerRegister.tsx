import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './retailerRegister.css';

<<<<<<< HEAD
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

=======
>>>>>>> origin/eCommerceWebsite
const RetailerRegister: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
<<<<<<< HEAD
    companyName: '',
    email: '',
    phone: '',
    address: '',
    companyLogo: null as File | null,
    profileImage: null as File | null,
=======
    email: '',
    phone: '',
    profile: '',
    password: '',
    confirmPassword: '',
>>>>>>> origin/eCommerceWebsite
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
<<<<<<< HEAD
    companyName: Yup.string().required('Company name is required'),
=======
>>>>>>> origin/eCommerceWebsite
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number is not valid')
      .required('Phone number is required'),
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/eCommerceWebsite
  };

  return (
    <div className="register-container">
<<<<<<< HEAD
      <div className='header'>
        <h2>Register as Retailer</h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
=======
     
      <div className='header'>
         <h2>Register as Retailer</h2>

      </div>

     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
>>>>>>> origin/eCommerceWebsite
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
<<<<<<< HEAD
                <label>Company Name:</label>
                <Field type="text" name="companyName" />
                <ErrorMessage name="companyName" component="div" className="error" />
              </div>
              <div className="form-field">
=======
>>>>>>> origin/eCommerceWebsite
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
<<<<<<< HEAD
            </div>
            <div className="form-row">
=======
>>>>>>> origin/eCommerceWebsite
              <div className="form-field">
                <label>Phone:</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
<<<<<<< HEAD
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

=======
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
>>>>>>> origin/eCommerceWebsite
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RetailerRegister;
