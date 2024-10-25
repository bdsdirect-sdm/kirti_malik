import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const { retailerId } = useParams<{ retailerId: string }>();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    quantity: 0,
    price: 0,
    status: 'draft',
    image: null as File | null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    quantity: Yup.number().required('Quantity is required').min(1),
    price: Yup.number().required('Price is required').min(0),
    status: Yup.string().required('Status is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('quantity', values.quantity);
    formData.append('price', values.price);
    formData.append('status', values.status);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      const response = await fetch(`http://localhost:8080/app/addProducts/${retailerId}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        navigate(`/dashboard/${retailerId}`);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Product Name:</label>
              <Field className="form-control" type="text" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity:</label>
              <Field className="form-control" type="number" name="quantity" />
              <ErrorMessage name="quantity" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Price:</label>
              <Field className="form-control" type="number" name="price" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Status:</label>
              <Field as="select" name="status" className="form-select">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Image:</label>
              <input
                className="form-control"
                type="file"
                name="image"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    setFieldValue('image', event.currentTarget.files[0]);
                  }
                }}
              />
              <ErrorMessage name="image" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
