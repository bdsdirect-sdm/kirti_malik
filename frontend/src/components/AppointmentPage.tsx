import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";


type ReferralPatient={
  firstName:string,
  lastName:string,
  email:string,
  status:string,
}
type Appointment = {
  id: number;
  appointmentDate:string;
  appointmentType:string;
  type: string;
  status: string;
  ReferralPatient:ReferralPatient
};

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { DoctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/getAppointments/${DoctorId}`
      );
      console.log("hiuhuuh",response.data.appointments)
      setAppointments(response.data.appointments);
      // const appointmentId=response.data.appointments[0].id;
      // localStorage.setItem('appointmentId',appointmentId)
      // console.log("idddddd",appointmentId)
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await axios.put(`${config.BASE_URL}/completeAppointment/${id}`);
      fetchAppointments(); 
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await axios.put(`${config.BASE_URL}/cancelAppointment/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleView = (patientId: number) => {
    navigate(`/viewAppointment/${patientId}`); 
  };

  const handleEdit = (patientId: number) => {
    navigate(`/editPatient/${patientId}`); 
  };

  return (
    <Container>
      <h2 className="text-center my-4">Appointments</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date </th>
            <th>Type</th>
            <th>Status</th>
            <th>Complete Appointment</th>
            <th>Cancel Appointment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.ReferralPatient.firstName}{appointment.ReferralPatient.lastName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentType}</td>
              <td>{appointment.ReferralPatient.status}</td>
              <td>
                {appointment.status !== "completed" && (
                  <Button
                    variant="success"
                    onClick={() => handleComplete(appointment.id)}
                  >
                    Complete
                  </Button>
                )}
              </td>
              <td>
                {appointment.status === "scheduled" && (
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => handleView(appointment.id)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(appointment.id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AppointmentPage;
