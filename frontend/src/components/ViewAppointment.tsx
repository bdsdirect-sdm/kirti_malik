/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import config from "../config";


type Appointment = {
  id: number;
  appointmentDate: string;
  appointmentType: string;
  status: string;
  ReferralPatient: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

const ViewPatientAppointments: React.FC = () => {
  const {patientId}=useParams();
  console.log("uuuuuu",patientId)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPatientAppointments();
  }, [patientId]); 

  const fetchPatientAppointments = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/getAppointmentsByPatient/${patientId}`
      );
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Basic info </h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Appointment Type</th>
              <th>Status</th>
              <th>Patient Name</th>
              <th>Patient Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentType}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.ReferralPatient.firstName} {appointment.ReferralPatient.lastName}</td>
                  <td>{appointment.ReferralPatient.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No appointments found for this patient.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewPatientAppointments;
