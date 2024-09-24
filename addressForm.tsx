import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Address {
    title: string;
    street: string;
    city: string;
    country: string;
    pincode: string;
}

const initialValues = 
{
   address:[
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

    address:Yup.array().of(
        Yup.object().shape(
            {
            title: Yup.string().trim().required('Title is required'),
            street: Yup.string().trim().required('Street is required'),
            city: Yup.string().trim().required('City is required'),
           country: Yup.string().trim().required('Country is required'),
           pincode: Yup.string().trim()
             .required('Pincode is required')
             .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
              }
        )
    )    
});



const AddressForm: React.FC = () => {
    const [submittedData, setSubmittedData] = useState<Address[]>([]);
    


    const handleSubmit = (values: typeof initialValues,{ resetForm }: { resetForm: () => void }) => {
        console.log('Form Submitted:', values);
         console.log('Added Address:', values.address[0]);
        setSubmittedData([...submittedData,values.address[0]]);
        resetForm();
    };
    const handleClick = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
        console.log('Added Address:', values.address[0]);
        
        resetForm(); 
       
    };
    return (
        <div className='container mt-5'>
            <h1>Address Form</h1>
            <Formik  
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values,resetForm}) => (
                    <Form className='mx-auto'>
                        <div className='mb-3'>
                            <label className='form-label'>Title :</label>
                            <Field name="address[0].title" type="text" />
                            <ErrorMessage name='address[0].title'/>
                        </div>

                        <div className='mb-3'>
                            <label >Street :</label>
                            <Field name="address[0].street" type="text" />
                            <ErrorMessage name="addresss[0].street" />
                        </div>

                        <div className='mb-3'>
                            <label >City</label>
                            <Field name="address[0].city" type="text" />
                            <ErrorMessage name="address[0].city"  />
                        </div>

                        <div className='mb-3'>
                            <label>Country</label>
                            <Field name="address[0].country" type="text" />
                            <ErrorMessage name="address[0].country"  />
                        </div>

                        <div className='mb-3'>
                            <label >Pincode</label>
                            <Field name="address[0].pincode" type="text" />
                            <ErrorMessage name="address[0].pincode"  />
                        </div>

                        <button type="button" className='btn btn-secondary' onClick={() => handleClick(values, { resetForm })}>ADD</button>
                        <button type='submit' className='btn btn-primary'>submit</button>
                    </Form>
                )}
            </Formik>
      

      {submittedData.length>0 && (
        <div>
          <h2>address details</h2>
          <ul>
            {submittedData.map((address,index)=>
            <li key={index}>
                 <strong>{address.title}</strong>:
                  {address.street}, 
                  {address.city}, 
                  {address.country}, 
                  {address.pincode}

            </li>)}
          </ul>
     
      </div>
 )}
        </div>
    );
}

export default AddressForm;
