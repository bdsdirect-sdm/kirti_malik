import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";

interface UpdateData {
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    gender: string;
    phoneNumber: string;
}

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Minimum 2 characters long')
        .required('First name is required'),

    last_name: Yup.string()
        .min(2, 'Minimum 2 characters is required')
        .required('Last name is required'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    dob: Yup.date()
        .nullable()
        .max(new Date(), 'Date of birth is required')
        .required('Date of birth is required'),

    gender: Yup.string()
        .required('Gender is required'),

    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits long'),
});

const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userData = location.state?.userData || {};

    const initialValues: UpdateData = {
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        phoneNumber: userData.phoneNumber || ''
    };

    const handleSubmit = async (values: UpdateData) => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("values::::::::::::::", values);
            try {
                const response = await axios.put('http://localhost:8000/api/users/update', values, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Profile updated successfully:', response.data);

                navigate('/profile');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    return (
        <div className="container mt-5 bg-info">
            <h1>Update Profile</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
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
                            <label htmlFor="dob">Date of Birth</label>
                            <Field className="form-control" name="dob" type="date" />
                            <ErrorMessage name="dob" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div role="group" aria-labelledby="my-radio-group">
                                <label>
                                    <Field type="radio" name="gender" value="male" /> Male
                                </label>
                                <label>
                                    <Field type="radio" name="gender" value="female" /> Female
                                </label>
                                <label>
                                    <Field type="radio" name="gender" value="other" /> Other
                                </label>
                                <ErrorMessage name="gender" component="div" className="text-danger" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field className="form-control" name="phoneNumber" type="text" />
                            <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Update</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateProfile;
