import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Validation Schema
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
  MedicalDocuments: Yup.mixed().required('Medical documents are required'),
});


const initialValues = {
  
  gender: '',
  diseaseName: '',
  laterality: '',
  returnPatient: '',
  MDdoctor: '',
  MedicalDocuments: null as File | null,
};

const AddAppointment: React.FC = () => {
  const [MDdoctors, setMDdoctors] = useState<any[]>([]);
  const{DoctorId}=useParams();

  const navigate=useNavigate();


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/app/getmddoctor');
        setMDdoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchPatients();
  }, [DoctorId]);

  // Handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
  
    formData.append('gender', values.gender);
    formData.append('diseaseName', values.diseaseName);
    formData.append('laterality', values.laterality);
    formData.append('returnPatient', values.returnPatient);
    formData.append('MDdoctor', values.MDdoctor);

    if (values.MedicalDocuments) {
      formData.append('MedicalDocuments', values.MedicalDocuments);
    }
    console.log(";;;;;;;;;;",values.MedicalDocuments)

    try {
      const response = await axios.post(`http://localhost:8080/app/addPatient/${DoctorId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     

      if (response.status === 201) {
        console.log('Patient added successfully');
        navigate(`/dashboard/${DoctorId}`)
       
      } else {
        throw new Error('Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:',error);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Add Appointment</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col md={6}>
               
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>First Name</BootstrapForm.Label>
                  <Field type="text" name="firstName" className="form-control" />
                  <ErrorMessage name="firstName" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                {/* Appointment Date */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>

     
              <Col md={6}>
          

               

                

                
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>MD Doctor</BootstrapForm.Label>
                  <Field as="select" name="MDdoctor" className="form-control">
                    <option value="">Select MD Doctor</option>
                    {MDdoctors.length > 0 ? (
                      MDdoctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.firstName + " " + doctor.lastName} >
                          {doctor.firstName} {doctor.lastName}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading doctors...</option>
                    )}
                  </Field>
                  <ErrorMessage name="MDdoctor" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>
            </Row>

            {/* Submit Button */}
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

export default AddAppointment;
