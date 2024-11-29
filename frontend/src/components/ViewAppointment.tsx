/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../config";


interface ReferralPatient{
   firstName: string;
    lastName: string;
    email: string;
}
interface Appointment {
  id: number;
  appointmentDate: string;
  appointmentType: string;
  status: string;
  ReferralPatient: ReferralPatient
};

const ViewPatientAppointments: React.FC = () => {
  const {patientId}=useParams();
  //console.log("uuuuuu",patientId)
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPatientAppointments();
  }, [patientId]); 

  const fetchPatientAppointments = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/getAppointmentByPatient/${patientId}`
      );
      console.log("response====",response.data.appointments)
      setAppointment(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
      setLoading(false);
    }
  };

  return (
   <div  className='patient-info mb-10 mt-5 ms-4 position-relative'>
     <h2 style={{ fontSize: '18px',fontWeight:'bold' }} className='mt-6 ms-4 pt-4'>Basic Information</h2>

      <div className="patient-section ms-4 me-4 mt-4">
       <Row>
         <Col md={6}>
             <p className='ms-3 mt-3'><strong>Patient Name:</strong> {appointment?.ReferralPatient.firstName}  {appointment?.ReferralPatient.lastName}</p>
             <p className='ms-3 mt-3'><strong>Appointment Date:</strong> {appointment?.appointmentDate}  </p>
             <p className='ms-3 mt-3'><strong>Appointment Type:</strong> {appointment?.appointmentType}  </p>
         </Col>

         
      </Row>      
      </div>

      
     
    </div>
  );
};

export default ViewPatientAppointments;
