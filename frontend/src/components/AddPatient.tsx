import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import config from '../config';
import socket from '../socket';


interface Notification{
  senderId:string,
  recieverId:string,
  patientId:string,
  message:string
}

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

  
  MedicalDocuments: null as File | null,
};

const AddPatient: React.FC = () => {
  const [MDdoctors, setMDdoctors] = useState<any[]>([]);
 
  const{DoctorId}=useParams();
  const doctorName=localStorage.getItem('doctorName')


  const navigate=useNavigate();


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/getmddoctor`);
        setMDdoctors(response.data);
      // setDoctorId(response.data.id)

      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

     socket.on('connect', () => {
      console.log('Connected to server');
    });
    fetchDoctors();
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append('dob', values.dob);
    formData.append('firstName', values.firstName);
    formData.append('diseaseName', values.diseaseName);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    
    formData.append('lastName', values.lastName);
    formData.append('gender', values.gender);
    
    formData.append('laterality', values.laterality);
    formData.append('returnPatient', values.returnPatient);
    formData.append('MDdoctor', values.MDdoctor);
    

    if (values.MedicalDocuments) {
      formData.append('MedicalDocuments', values.MedicalDocuments);
    }
    try {
      const response = await axios.post(`${config.BASE_URL}/addPatient/${DoctorId}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
     console.log("reeeeee",response.data)

      if (response.status === 201) {
        console.log('Patient added successfully');

       const notification : Notification={
        senderId: response.data.newPatient.ReferredBy,
        recieverId: response.data.newPatient.MDdoctor,
        patientId: response.data.newPatient.id,
        message: `${doctorName} has referred ${response.data.newPatient.firstName} ${response.data.newPatient.lastName} to you for further consultation`

       }
       
       socket.emit('sendNotification',notification)
          console.log("sending notification.....",notification)

        navigate(`/dashboard/${DoctorId}`)
       
      } else {
        throw new Error('Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:',error);
    }

   
  };

    const handleFileChange = (event: any, setFieldValue: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
     
      setFieldValue(event.currentTarget.name, file);
    }
  };

  return (    
  <Container className="add-form">
  <h5 className="pt-4 pb-4">Add Referral Patient</h5>
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting, setFieldValue }) => (
      <Form>
        <h5 className="pt-2 pb-2">Basic Information</h5>
        <Row>
          <Col md={4}>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>DOB</BootstrapForm.Label>
              <Field type="date" name="dob" className="form-control" placeholder="YYYY-MM-DD" />
              <ErrorMessage name="dob" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>First Name</BootstrapForm.Label>
              <Field type="text" name="firstName" className="form-control" placeholder="Enter first name" />
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Disease Name</BootstrapForm.Label>
              <Field as="select" name="diseaseName" className="form-control">
                <option value="">Select Disease</option>
                <option value="Glaucoma">Glaucoma</option>
                <option value="Cataract">Cataract</option>
                <option value="Macular Degeneration">Macular Degeneration</option>
              </Field>
              <ErrorMessage name="diseaseName" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>MD Doctor</BootstrapForm.Label>
              <Field as="select" name="MDdoctor" className="form-control">
                <option value="">Select MD Doctor</option>
                {MDdoctors.length > 0 ? (
                  MDdoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
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

          <Col md={4}>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Last Name</BootstrapForm.Label>
              <Field type="text" name="lastName" className="form-control" />
              <ErrorMessage name="lastName" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Laterality</BootstrapForm.Label>
              <Field as="select" name="laterality" className="form-control">
                <option value="">Select</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="both">Both</option>
              </Field>
              <ErrorMessage name="laterality" component="div" className="text-danger" />
            </BootstrapForm.Group>


            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Medical Documents</BootstrapForm.Label>
              <input
                type="file"
                name="MedicalDocuments"
                onChange={(e) => handleFileChange(e, setFieldValue)}
                className="form-control"
              />
              <ErrorMessage name="MedicalDocuments" component="div" className="text-danger" />
            </BootstrapForm.Group>
          </Col>


          <Col md={4}>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
              <Field type="text" name="phoneNumber" className="form-control" />
              <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
            </BootstrapForm.Group>

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
              <BootstrapForm.Label>Return Patient</BootstrapForm.Label>
              <Field as="select" name="returnPatient" className="form-control">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field>
              <ErrorMessage name="returnPatient" component="div" className="text-danger" />
            </BootstrapForm.Group>

          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6} className="d-flex justify-content-start cancel-btn">
          <Button
              type="button"
              className="me-3 custom-btn"
               //onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="custom-btn"
              // onClick={handleSaveAsDraft}
            >
              Save as Draft
            </Button>
            
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Button
              type="submit"
              className="w-50 custom-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Form>
    )}
  </Formik>
</Container>


  );
};

export default AddPatient;
