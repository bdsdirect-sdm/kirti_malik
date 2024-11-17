import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type Appointment = {
  id: number;
  patientName: string;
  dob: string;
  type: string;
  status: string;
};

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { DoctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/app/getAppointments/${DoctorId}`
      );
      console.log("hiuhuuh",response.data)
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await axios.put(`http://localhost:8080/app/completeAppointment/${id}`);
      fetchAppointments(); 
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await axios.put(`http://localhost:8080/app/cancelAppointment/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleView = (patientId: number) => {
    navigate(`/viewPatient/${patientId}`); 
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
            <th>Date of Birth</th>
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
              <td>{appointment.patientName}</td>
              <td>{appointment.dob}</td>
              <td>{appointment.type}</td>
              <td>{appointment.status}</td>
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
