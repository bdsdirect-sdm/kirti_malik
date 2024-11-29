import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';

const validationSchema = Yup.object({
 // patientId: Yup.string().required("Patient name is required"),
  appointmentType: Yup.string().required("Appointment type is required"),
  appointmentDate: Yup.date().required("Appointment date is required"),
});

const EditAppointment: React.FC = () => {
  const [appointment, setAppointment] = useState<any | null>(null); 
  //const[patients,setPatients]=useState<any[]>([])

  const doctorId=localStorage.getItem('DoctorId')
  const { patientId } = useParams();
  //console.log("hhhh",patientId)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/getAppointmentByPatient/${patientId}`);
        setAppointment(response.data.appointments);  
        console.log("Fetched appointment data", response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    // const fetchPatient=async()=>{
    //     try{
    //        const response=await axios.get(`${config.BASE_URL}/patient/${doctorId}`)
    //        setPatients(response.data);
    //        console.log("=========",response.data)
    //     }
    //     catch(error){
    //         console.error('error fetching patient',error)

    //     }
    // }
    // fetchPatient();
    fetchAppointment();
  }, [patientId,doctorId]);

  const handleSubmit = async (values: any) => {
    try {
      const {  appointmentDate, appointmentType } = values;

      const response = await axios.put(`${config.BASE_URL}/editAppointment/${patientId}`, {
      
        appointmentDate,
        appointmentType,
      });

      if (response.status === 200) {
        console.log("Appointment edited successfully");
        navigate(`/appointment/${doctorId}`);  
      } else {
        throw new Error("Failed to edit appointment");
      }
    } catch (error) {
      console.error("Error editing appointment:", error);
    }
  };

 
  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="text-center my-4">Edit Appointment</h2>
      <Formik
        initialValues={{
          patientName: `${ appointment.ReferralPatient.firstName} ${appointment.ReferralPatient.lastName}`,  
          appointmentType: appointment.appointmentType,
          appointmentDate: appointment.appointmentDate.split('T')[0], 
        }}
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
                   
                    name="patientName"
                    className="form-control">                
                    
                  
                  </Field>
                  <ErrorMessage name="patientName" component="div" className="text-danger" />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Appointment Type</BootstrapForm.Label>
                  <Field as="select" name="appointmentType" className="form-control">
                    <option value="">Select type</option>
                    <option value="consultation" selected={appointment.appointmentType === 'consultation'}>
                      Consultation
                    </option>
                    <option value="surgery" selected={appointment.appointmentType === 'surgery'}>
                      Surgery
                    </option>
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

export default EditAppointment;
