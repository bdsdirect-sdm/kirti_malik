import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

interface UserData {
  name: string;
  email: string;
  password: string;
  id: string;
}

interface registerResponse{
  message:string;
  user:UserData
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('First name is required')
    .min(2, 'Must be 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters'),
});

const registerUser = async (newUser: UserData): Promise<registerResponse> => {
  const response = await axios.post<registerResponse>('http://localhost:8000/api/register', newUser);
  console.log('api response',response.data)
  return response.data;
};

const RegistrationForm: React.FC = () => {
  const initialValues: UserData = {
    name: '',
    email: '',
    password: '',
    id: ''
  };

  const [user, setUser] = useState<UserData | null>(null); 

  const mutation = useMutation<registerResponse, Error, UserData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert('User registered successfully');
      setUser(data.user); 
      console.log('User registered', data);
    },
    onError: (error: Error) => {
      console.error('Registration failed', error);
    }
  });

  const handleSubmit = async (values: UserData) => {
    console.log('submitting.....',values)
    mutation.mutate(values);
    console.log('this is user name',values.name)
  };


  useEffect(() => {
    if (user) {
      console.log('User state updated:', user); 
    }
  }, [user]);

  console.log('this is user',user)
  return (
    <div className="container mt-5 bg-info">
      <h1>SIGN UP PAGE</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field className="form-control" name="name" type="text" />
              <ErrorMessage name="name" component="div" className="text-danger" />
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

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </Form>
        )}
      </Formik>

      {user && (
        <div className="mt-5">
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
