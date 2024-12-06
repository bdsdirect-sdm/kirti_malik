import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Modal, Image, Button } from 'react-bootstrap';
import config from '../config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface DoctorInfo {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phoneNumber: number;
  diseaseName: string;
  laterality: string;
  returnPatient: string;
  address: string;
  DoctorAddress: DoctorAddress;
}

interface DoctorAddress {
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<DoctorAddress>({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  const DoctorId = localStorage.getItem('DoctorId');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/getDoctor/${DoctorId}`);
        setDoctor(response.data);
        if (response.data?.DoctorAddress) {
          setFormData(response.data.DoctorAddress);
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    };

    fetchDoctor();
  }, [DoctorId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (values: DoctorAddress) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/doctorAddress/${DoctorId}`, values);
      alert('Address added successfully');
      setFormData(response.data); 
      handleCloseModal();
    } catch (error) {
      console.error('Error adding address of doctor', error);
    }
  };

  const validationSchema = Yup.object({
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().required('Pincode is required').matches(/^\d{6}$/, 'Pincode must be 6 digits')
  });

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className='mt-6 ms-4 pt-4'>Profile</h2>

      <div className='doctor-info mb-10 mt-5  me-4 ms-3 position-relative'>
        <Row className='ms-2 mt-6'>
          <Col md={6} className='d-flex'>
            <div className='mt-3'>
              <Image src="/doctor.jpeg" roundedCircle />
            </div>
            <div className='mt-4'>
              <p className='ms-3 mt-3'>
                <strong>{doctor?.firstName}  {doctor?.lastName}</strong>
              </p>
              <p className='ms-3 mt-3'>Opthalmologist</p>
            </div>
          </Col>

          <Col md={6} className='mt-4'>
            <button type="button" className="btn btn-primary ms-10" onClick={handleShowModal}>
              Add address
            </button>
          </Col>
        </Row>

        <div className="doctor-section ms-4 me-4 mt-6">
          <Row className='mt-5'>
            <Col md={6}>
              <p className='ms-3 mt-3'><strong>Name:</strong> {doctor?.firstName} {doctor?.lastName}</p>
              <p className='ms-3 mt-3'><strong>Speciality: </strong>Opthalmologist</p>
            </Col>

            <Col md={6}>
              <p className='ms-3 mt-3'><strong>Email:</strong> {doctor?.email}</p>
              <p className='ms-3 mt-3'><strong>Location: </strong></p>
            </Col>
          </Row>
        </div>

        <div className="doctor-section ms-4 me-4 mt-4">
          <div className='mt-4'>
            <p><strong>Address Information</strong></p>
          </div>

          <Row className='mb-4'>
            <p>{doctor?.DoctorAddress.address}<br/>{doctor?.DoctorAddress.country}<br/>
            {doctor?.DoctorAddress.state}<br/>{doctor?.DoctorAddress.city}<br/>{doctor?.DoctorAddress.pincode}
            </p>
          </Row>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={formData} 
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    className="form-control"
                  />
                  <ErrorMessage name="address" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <Field
                    type="text"
                    name="country"
                    placeholder="Enter your country"
                    className="form-control"
                  />
                  <ErrorMessage name="country" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <Field
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    className="form-control"
                  />
                  <ErrorMessage name="state" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <Field
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    className="form-control"
                  />
                  <ErrorMessage name="city" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <Field
                    type="text"
                    name="pincode"
                    placeholder="Enter your pincode"
                    className="form-control"
                  />
                  <ErrorMessage name="pincode" component="div" className="text-danger" />
                </div>

                <div className="d-flex justify-content-end gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorProfile;
