import React, { useEffect, useState } from 'react'
import { Button,  Row, Col, Card, Table, Container, Alert,  } from 'react-bootstrap';
import './style.css'
import axios from 'axios';
import socket from '../socket';
import { useNavigate,  } from 'react-router-dom';
import config from '../config';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type DashboardData = {
    referralsRecieved: number;
    referralsCompleted: number;
    totalDoctor:number
};


interface Notification{

          senderId:string,
           recieverId:string,
          patientId:string,
           message:string,

}
const MDdashboard = () => {

  const navigate=useNavigate();
  const[referredPatientsList,setReferredPatients]=useState<any[]>([]);
  const[notifications,setNotifications]=useState<string[]>([]);

  const[isLoading,setIsLoading]=useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
        referralsRecieved: 0,
        referralsCompleted: 0,
        totalDoctor: 0,
      
    });
    
  const DoctorId=localStorage.getItem('DoctorId')
 

const handleAddAppointment=async()=>{
  navigate(`/addAppointment/${DoctorId}`)

}
useEffect(()=>{
  setIsLoading(true);
  fetchReferredPatients();
  fetchDashboardData();
   

    socket.on('recieveNotification',(newNotification:Notification)=>{
        console.log("new notification recieved",newNotification);
       toast.info(newNotification.message)
      })

},[socket,DoctorId])

  const fetchReferredPatients = async () => {
   const response = await axios.get(`${config.BASE_URL}/patient/${DoctorId}`);
    setReferredPatients(response.data);
  };

  const fetchDashboardData=async()=>{
    const response=await axios.get(`${config.BASE_URL}/MDdashboardData/${DoctorId}`)
    setDashboardData(response.data);
  }

  return (
     <Container className='dashboard'>

         {notifications.length > 0 && (
        <Alert variant="info">
          <h5>New Notification</h5>
          <p>{notifications[0]}</p>
        </Alert>
      )}
     
<Row className="mb-4 pt-0">
  <h5>Dashboard</h5>

  <Col xs={12} sm={4} md={4}>
    <Card className="custom-card">
      <Card.Body className="d-flex">
        <div className="d-flex flex-column me-3">
          <div>
            <img
              src="/diversity_2.png"
              alt="Referral Icon"
              className="img-fluid"
              style={{ width: '50px', height: '50px' }}
            />
          </div>
          <Card.Title className="mt-2 small font">Referrals Recieved</Card.Title>
        </div>

        <div className="d-flex flex-column justify-content-between">
          <Card.Text className="text-end">{dashboardData.referralsRecieved}</Card.Text>
          <hr />
          <small className="text-muted">Last Updated: {}</small>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col xs={12} sm={4} md={4}>
    <Card className="custom-card">
      <Card.Body className="d-flex">
        <div className="d-flex flex-column me-3">
          <div>
            <img
              src="/personal_injury.png"
              alt="Referral Icon"
              className="img-fluid"
              style={{ width: '50px', height: '50px' }}
            />
          </div>
          <Card.Title className="mt-2 small font">Referrals Completed</Card.Title>
        </div>

        <div className="d-flex flex-column justify-content-between">
          <Card.Text className="text-end">{dashboardData.referralsCompleted}</Card.Text>
          <hr />
          <small className="text-muted">Last Updated: Aug 20</small>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col xs={12} sm={4} md={4}>
    <Card className="custom-card">
      <Card.Body className="d-flex">
        <div className="d-flex flex-column me-3">
          <div>
            <img
              src="/stethoscope.png"
              alt="Referral Icon"
              className="img-fluid"
              style={{ width: '50px', height: '50px' }}
            />
          </div>
          <Card.Title className="mt-2 small font">MD Count</Card.Title>
        </div>

        <div className="d-flex flex-column justify-content-between">
          <Card.Text className="text-end">{dashboardData.totalDoctor}</Card.Text>
          <hr />
          <small className="text-muted">Last Updated: {}</small>
        </div>
      </Card.Body>
    </Card>
  </Col>

</Row>

 <div className="d-flex justify-content-between w-100">
  <div>
    
    <h2 style={{ fontSize: '24px' }}>Referrals placed</h2>
  </div>
  <div>
    <Button onClick={handleAddAppointment} className='btn-color'>
     <img src='/addAppointment.png' alt='button'/>
    </Button>
  </div>
</div>


       <div className="mt-4 me-4" style={{ overflowX: 'auto' }}>
          <Table className='table '>
            <thead>
              <tr>
                <th>Patient name</th>
                <th>DOB</th>
                <th>Referred on</th>
                <th>Referred by</th>
                <th>Consultation date</th>
                <th>Surgery date</th>
                <th>Status</th>
                <th>Return to Referrer</th>
                <th>Consult note</th>
                <th>Direct Message</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {referredPatientsList.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.dob}</td>
                  <td>{new Date(patient.createdAt).toISOString().split('T')[0]}</td>
                   <td> {patient.ReferredBy}</td>
                     <td>
             {patient.Appointment?.appointmentType === 'consultation' ? (
               new Date(patient.Appointment?.appointmentDate).toISOString().split('T')[0]
               ):'-'}
             </td>

          <td>
             {patient.Appointment?.appointmentType === 'surgery' ? (
               new Date(patient.Appointment?.appointmentDate).toISOString().split('T')[0]
               ):'-'}
             </td>
                  <td>{patient.status}</td>
                  <td>{patient.returnPatient}</td>
                  <td></td> 
                  <td></td> 
                  <td></td> 
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </Container>
  )
}

export default MDdashboard