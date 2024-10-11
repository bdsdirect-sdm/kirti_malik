import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.css';

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  userType: 'job seeker' | 'job agency';
  agency?: string;
  agencyName?: string;
  agencyAddress?: string;
  resume: File | null;
  profileImage: File | null;
  hobbies: string[];
}

const addUser = async (newUser: FormData): Promise<UserData> => {
  const response = await axios.post<UserData>('http://localhost:8000/api/register', newUser);
  return response.data;
}

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'job seeker' | 'job agency'>('job seeker');

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value as 'job seeker' | 'job agency');
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    hobbies: Yup.array().min(1, 'At least one hobby is required').of(Yup.string()),
    profileImage: Yup.mixed().required('Profile Image is required'),
    agency: userType === 'job seeker' ? Yup.string().required('Agency is required') : Yup.string().notRequired(),
    resume: userType === 'job seeker' ? Yup.mixed().required('Resume is required') : Yup.mixed().notRequired(),
  });

  const mutation = useMutation<UserData, Error, FormData>({
    mutationFn: addUser,
    onSuccess: (data) => {
      alert('User registered successfully');
      console.log('User registered:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });

  const handleSubmit = async (values: UserData) => {
    const formData = new FormData();
  
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('phone', values.phone); 
    formData.append('email', values.email);
    formData.append('gender', values.gender);
    formData.append('userType', values.userType);
    
    if (values.userType === 'job agency') {
      formData.append('agencyName', values.agencyName!);
      formData.append('agencyAddress', values.agencyAddress!);
    } else {
      formData.append('agency', values.agency!);
      if (values.resume) {
        formData.append('resume', values.resume);
      }
    }
  
    values.hobbies.forEach(hobby => formData.append('hobbies', hobby));
  
    if (values.profileImage) {
      formData.append('profileImage', values.profileImage);
    }
  
    mutation.mutate(formData);
  };
  

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 d-flex align-items-center justify-content-center'>
          <div>
            <h1>Welcome to the Job Portal</h1>
            <p>Find your dream job or connect with job seekers.</p>
          </div>
        </div>
        <div className='col-6 mt-5'>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              gender: '',
              agency: '',
              userType: 'job seeker',
              agencyName: '',
              agencyAddress: '',
              resume: null,
              profileImage: null,
              hobbies: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className='p-4 border rounded shadow-sm'>
                <div className='mb-3'>
                  <label className='form-label'>User Type</label>
                  <Field as='select' name='userType' className='form-control' onChange={handleUserTypeChange}>
                    <option value='job seeker'>Job Seeker</option>
                    <option value='job agency'>Job Agency</option>
                  </Field>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>First Name</label>
                  <Field type='text' className='form-control' name='firstName' />
                  <ErrorMessage name='firstName' component='div' className='text-danger' />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Last Name</label>
                  <Field type='text' className='form-control' name='lastName' />
                  <ErrorMessage name='lastName' component='div' className='text-danger' />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Phone Number</label>
                  <Field type='text' className='form-control' name='phone' />
                  <ErrorMessage name='phone' component='div' className='text-danger' />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <Field type='email' className='form-control' name='email' />
                  <ErrorMessage name='email' component='div' className='text-danger' />
                </div>

                <div className='mb-3'>
                  <label>Gender</label>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label className='me-2'>
                      <Field type='radio' name='gender' value='male' /> Male
                    </label>
                    <label>
                      <Field type='radio' name='gender' value='female' /> Female
                    </label>
                  </div>
                  <ErrorMessage name='gender' component='div' className='text-danger' />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Hobbies</label>
                  <div role="group" aria-labelledby="hobbies-group">
                    <label>
                      <Field type="checkbox" name="hobbies" value="reading" />
                      Reading
                    </label>
                    <label>
                      <Field type="checkbox" name="hobbies" value="gaming" />
                      Gaming
                    </label>
                    <label>
                      <Field type="checkbox" name="hobbies" value="traveling" />
                      Traveling
                    </label>
                    <label>
                      <Field type="checkbox" name="hobbies" value="cooking" />
                      Cooking
                    </label>
                  </div>
                  <ErrorMessage name='hobbies' component='div' className='text-danger' />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Upload Profile Image</label>
                  <input 
                    type='file' 
                    className='form-control' 
                    name='profileImage' 
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        setFieldValue('profileImage', event.currentTarget.files[0]);
                      }
                    }}
                  />
                  <ErrorMessage name='profileImage' component='div' className='text-danger' />
                </div>

                {userType === 'job seeker' && (
                  <>
                    <div className='mb-3'>
                      <label className='form-label'>Choose Agency</label>
                      <Field as='select' name='agency' className='form-control'>
                        <option value=''>Select Agency</option>
                        <option value='agency1'>Agency 1</option>
                        <option value='agency2'>Agency 2</option>
                      </Field>
                      <ErrorMessage name='agency' component='div' className='text-danger' />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Upload Resume</label>
                      <input 
                        type='file' 
                        className='form-control' 
                        name='resume' 
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            setFieldValue('resume', event.currentTarget.files[0]);
                          }
                        }}
                      />
                      <ErrorMessage name='resume' component='div' className='text-danger' />
                    </div>
                  </>
                )}

              

                <button type='submit' className='btn btn-success'>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
