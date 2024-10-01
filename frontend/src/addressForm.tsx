import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Address {
    title: string;
    street: string;
    city: string;
    country: string;
    pincode: string;
}

const initialValues = {
    addresses: [
        {
            title: '',
            street: '',
            city: '',
            country: '',
            pincode: ''
        }
    ]
};

const validationSchema = Yup.object().shape({
    addresses: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().trim().required('Title is required'),
            street: Yup.string().trim().required('Street is required'),
            city: Yup.string().trim().required('City is required'),
            country: Yup.string().trim().required('Country is required'),
            pincode: Yup.string()
                .required('Pincode is required')
                .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
        })
    )
});

const AddressForm: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);

 //values will store the values which user has done input at the time of submission
 //reset the form will initial values
    
    const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
        console.log('Form Submitted:', values);
        setAddresses([...addresses, ...values.addresses]);
        resetForm();
    };

   
    const handleAddAddress = (values: typeof initialValues, { setFieldValue }: { setFieldValue: (field: string, value: any) => void }) => {
  
        const isValid = validationSchema.isValidSync(values);
        if (isValid) {
            setFieldValue('addresses', [...values.addresses, { title: '', street: '', city: '', country: '', pincode: '' }]);
        } else {
            alert('Please fill out the current address form correctly before adding a new one.');
        }
    };

    return (
        <div className='container mt-5'>
            <h1>Address Form</h1>
            <Formik  
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className='mx-auto'>
                        {values.addresses.map((address, index) => (
                             <div key={index} className='mb-3'>
                                <h5>Address {index + 1}</h5>
                                <label className='form-label'>Title:</label>
                                <Field name={`addresses[${index}].title`} type="text" />
                                <ErrorMessage name={`addresses[${index}].title`} />

                                <label>Street:</label>
                                <Field name={`addresses[${index}].street`} type="text" />
                                <ErrorMessage name={`addresses[${index}].street`} />

                                <label>City:</label>
                                <Field name={`addresses[${index}].city`} type="text" />
                                <ErrorMessage name={`addresses[${index}].city`} />

                                <label>Country:</label>
                                <Field name={`addresses[${index}].country`} type="text" />
                                <ErrorMessage name={`addresses[${index}].country`} />

                                <label>Pincode:</label>
                                <Field name={`addresses[${index}].pincode`} type="text" />
                                <ErrorMessage name={`addresses[${index}].pincode`} />
                            </div>
                        ))}
                        <button type="button" className='btn btn-secondary' onClick={() => handleAddAddress(values, { setFieldValue })}>
                            ADD
                        </button>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </Form>
                )}
            </Formik>

            {addresses.length > 0 && (
                <div>
                    <h2>Address Details</h2>
                    <ul>
                        {addresses.map((address, index) => (
                            <li key={index}>
                                <strong>{address.title}</strong>: {address.street}, {address.city}, {address.country}, {address.pincode}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AddressForm;
