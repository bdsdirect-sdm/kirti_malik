import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: File | null;
  companyAddress: string;
  companyState: string;
  companyCity: string;
  companyZip: string;
  homeAddress: string;
  homeState: string;
  homeCity: string;
  homeZip: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'Must be 2 characters long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Must be 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  profilePhoto: Yup.mixed()
    .required('Profile photo is required'),
  companyAddress: Yup.string().required('Company address is required'),
  companyState: Yup.string().required('Company state is required'),
  companyCity: Yup.string().required('Company city is required'),
  companyZip: Yup.string().required('Company ZIP code is required'),
  homeAddress: Yup.string().required('Home address is required'),
  homeState: Yup.string().required('Home state is required'),
  homeCity: Yup.string().required('Home city is required'),
  homeZip: Yup.string().required('Home ZIP code is required'),
});

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation(); // Access the passed state
  const userData = location.state;

  const [initialValues, setInitialValues] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    profilePhoto: null,
    companyAddress: '',
    companyState: '',
    companyCity: '',
    companyZip: '',
    homeAddress: '',
    homeState: '',
    homeCity: '',
    homeZip: '',
  });

  // Set initial form values when in "Update" mode
  useEffect(() => {
    if (userData) {
      setInitialValues({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        profilePhoto: null, // Files cannot be prefilled
        companyAddress: userData.address?.companyAddress || '',
        companyState: userData.address?.companyState || '',
        companyCity: userData.address?.companyCity || '',
        companyZip: userData.address?.companyZip || '',
        homeAddress: userData.address?.homeAddress || '',
        homeState: userData.address?.homeState || '',
        homeCity: userData.address?.homeCity || '',
        homeZip: userData.address?.homeZip || '',
      });
    }
  }, [userData]);

  // Form submission handler
  const handleSubmit = async (values: UserData, { resetForm }: { resetForm: () => void }) => {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      if (values.profilePhoto) formData.append('profilePhoto', values.profilePhoto as File); // Only append if a file is selected
      formData.append('companyAddress', values.companyAddress);
      formData.append('companyState', values.companyState);
      formData.append('companyCity', values.companyCity);
      formData.append('companyZip', values.companyZip);
      formData.append('homeAddress', values.homeAddress);
      formData.append('homeState', values.homeState);
      formData.append('homeCity', values.homeCity);
      formData.append('homeZip', values.homeZip);

      let response;
      if (id) {
        // Update existing user
        response = await axios.put(`http://localhost:8080/api/profile/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Profile updated successfully!');
        navigate(`/profile/${id}`);
      } else {
        // Create a new user
        response = await axios.post('http://localhost:8080/api/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const newUserId = response.data.user.id;
        alert('Registration successful!');
        navigate(`/profile/${newUserId}`);
      }

      resetForm();
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Validation schema for the form
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    companyAddress: Yup.string().required('Company address is required'),
    companyState: Yup.string().required('Company state is required'),
    companyCity: Yup.string().required('Company city is required'),
    companyZip: Yup.string().required('Company ZIP is required'),
    homeAddress: Yup.string().required('Home address is required'),
    homeState: Yup.string().required('Home state is required'),
    homeCity: Yup.string().required('Home city is required'),
    homeZip: Yup.string().required('Home ZIP is required'),
  });

  return (
    <div className="container mt-5 bg-light p-4">
      <h1 className="text-center mb-4">{id ? 'Update Profile' : 'Sign Up'}</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field className="form-control" name="firstName" type="text" />
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field className="form-control" name="lastName" type="text" />
              <ErrorMessage name="lastName" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field className="form-control" name="email" type="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                className="form-control"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    setFieldValue('profilePhoto', event.currentTarget.files[0]);
                  }
                }}
              />
              <ErrorMessage name="profilePhoto" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="companyAddress">Company Address</label>
              <Field className="form-control" name="companyAddress" type="text" />
              <ErrorMessage name="companyAddress" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="companyState">Company State</label>
              <Field className="form-control" name="companyState" type="text" />
              <ErrorMessage name="companyState" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="companyCity">Company City</label>
              <Field className="form-control" name="companyCity" type="text" />
              <ErrorMessage name="companyCity" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="companyZip">Company ZIP</label>
              <Field className="form-control" name="companyZip" type="text" />
              <ErrorMessage name="companyZip" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="homeAddress">Home Address</label>
              <Field className="form-control" name="homeAddress" type="text" />
              <ErrorMessage name="homeAddress" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="homeState">Home State</label>
              <Field className="form-control" name="homeState" type="text" />
              <ErrorMessage name="homeState" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="homeCity">Home City</label>
              <Field className="form-control" name="homeCity" type="text" />
              <ErrorMessage name="homeCity" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="homeZip">Home ZIP</label>
              <Field className="form-control" name="homeZip" type="text" />
              <ErrorMessage name="homeZip" component="div" className="text-danger" />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                {id ? 'Update' : 'Register'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;