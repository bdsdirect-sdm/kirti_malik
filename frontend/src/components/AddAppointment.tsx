import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';


const validationSchema = Yup.object({
  patientId: Yup.string().required("Patient name is required"),
  appointmentType: Yup.string().required("Appointment type is required"),
  appointmentDate: Yup.date().required("Appointment date is required"),
});

const initialValues = {
  patientId: "", 
  appointmentType: "",
  appointmentDate: "",
 
};

const AddAppointment: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const { DoctorId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/patient/${DoctorId}`);
        setPatients(response.data); 
       
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [DoctorId]);

 
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { patientId, appointmentDate, appointmentType,  } = values;
      
      const response = await axios.post(`${config.BASE_URL}/addAppointment/${DoctorId}`, {
        patientId,
        appointmentDate,
        appointmentType,
        
      });

     
      if (response.status === 201) {
        console.log("Appointment added successfully");
        navigate(`/appointment/${DoctorId}`);
      } else {
        throw new Error("Failed to add appointment");
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
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
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Row>
             
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Patient Name</BootstrapForm.Label>
                  <Field
                    as="select"
                    name="patientId"
                    className="form-control"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      
                      const selectedPatient = patients.find(
                        (patient) => `${patient.firstName} ${patient.lastName}` === e.target.value
                      );
                      if (selectedPatient) {
                        setFieldValue("patientName", e.target.value);
                        setFieldValue("patientId", selectedPatient.id);
                      }
                    }}
                  >
                    <option value="">Select Patient</option>
                    {patients.length > 0 ? (
                      patients.map((patient) => (
                        <option key={patient.id} value={`${patient.firstName} ${patient.lastName}`}>
                          {patient.firstName} {patient.lastName}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading patients...</option>
                    )}
                  </Field>
                  <ErrorMessage name="patientId" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Appointment Type</BootstrapForm.Label>
                  <Field as="select" name="appointmentType" className="form-control">
                    <option value="">Select type</option>
                    <option value="consultation">Consultation</option>
                    <option value="surgery">Surgery</option>
                  </Field>
                  <ErrorMessage name="appointmentType" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>

             
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Appointment Date</BootstrapForm.Label>
                  <Field type="date" name="appointmentDate" className="form-control" />
                  <ErrorMessage name="appointmentDate" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>
            </Row>

           
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddAppointment;
