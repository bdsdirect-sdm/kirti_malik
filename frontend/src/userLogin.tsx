import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginData {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
});

const Login: React.FC = () => {
    const navigate = useNavigate();

    const initialValues: LoginData = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values: LoginData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', values);
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/profile'); 
        } catch (error) {
            alert('Login failed');
            console.log('Error during login', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Login</h1>
            <div className="card p-4 mt-3">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Enter Email:</label>
                                <Field name="email" type="text" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="password">Password:</label>
                                <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
