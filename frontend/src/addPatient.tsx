import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';

// Validation schema
const validationSchema = Yup.object({
  dob: Yup.date().required('Date of birth is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  diseaseName: Yup.string().required('Disease name is required'),
  laterality: Yup.string().required('Laterality is required'),
  returnPatient: Yup.string().required('Return patient status is required'),
  MDdoctor: Yup.string().required('MD doctor is required'),
  MedicalDocuments: Yup.string().required('Medical documents are required'),
});

// Initial values
const initialValues = {
  dob: '',
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  gender: '',
  diseaseName: '',
  laterality: '',
  returnPatient: '',
  MDdoctor: '',
  MedicalDocuments: '',
};

const AddPatient: React.FC = () => {
  // Handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Add Patient</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form as={BootstrapForm}>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Date of Birth</BootstrapForm.Label>
                  <Field type="date" name="dob" className="form-control" />
                  <ErrorMessage name="dob" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>First Name</BootstrapForm.Label>
                  <Field type="text" name="firstName" className="form-control" />
                  <ErrorMessage name="firstName" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                  <Field type="text" name="lastName" className="form-control" />
                  <ErrorMessage name="lastName" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
                  <Field type="text" name="phoneNumber" className="form-control" />
                  <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Gender</BootstrapForm.Label>
                  <Field as="select" name="gender" className="form-control">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Disease Name</BootstrapForm.Label>
                  <Field type="text" name="diseaseName" className="form-control" />
                  <ErrorMessage name="diseaseName" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Laterality</BootstrapForm.Label>
                  <Field type="text" name="laterality" className="form-control" />
                  <ErrorMessage name="laterality" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Return Patient</BootstrapForm.Label>
                  <Field type="text" name="returnPatient" className="form-control" />
                  <ErrorMessage name="returnPatient" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>MD Doctor</BootstrapForm.Label>
                  <Field type="text" name="MDdoctor" className="form-control" />
                  <ErrorMessage name="MDdoctor" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Medical Documents</BootstrapForm.Label>
                  <Field type="file" name="MedicalDocuments" className="form-control" />
                  <ErrorMessage name="MedicalDocuments" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Add Patient'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddPatient;
