import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const validationSchema = Yup.object({
  patientId: Yup.string().required("Patient is required"),
  appointmentDate: Yup.date().required("Appointment date is required"),
  type: Yup.string().oneOf(["consultation", "surgery"], "Invalid type").required("Type is required"),
});

// Initial values
const initialValues = {
  patientId: "",
  appointmentDate: "",
  type: "",
};

const AddAppointment: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]); 
  const { DoctorId } = useParams(); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [DoctorId]);

  // Handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(`http://localhost:8080/app/addAppointment`, {
        patientId: values.patientId,
        appointmentDate: values.appointmentDate,
        type: values.type,
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
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col md={6}>
                {/* Patient Dropdown */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Patient</BootstrapForm.Label>
                  <Field as="select" name="patientId" className="form-control">
                    <option value="">Select a Patient</option>
                    {patients.length > 0 ? (
                      patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
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
                {/* Appointment Date */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Appointment Date</BootstrapForm.Label>
                  <Field type="date" name="appointmentDate" className="form-control" />
                  <ErrorMessage name="appointmentDate" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {/* Appointment Type */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Type</BootstrapForm.Label>
                  <Field as="select" name="type" className="form-control">
                    <option value="">Select Type</option>
                    <option value="consultation">Consultation</option>
                    <option value="surgery">Surgery</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="text-danger" />
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
              {isSubmitting ? "Submitting..." : "Add Appointment"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddAppointment;
