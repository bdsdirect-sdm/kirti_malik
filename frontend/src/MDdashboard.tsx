import React, { useEffect, useState } from 'react'
import { Button,  Row, Col, Card, Table, Container,  } from 'react-bootstrap';
import './style.css'
import axios from 'axios';
import { useNavigate,  } from 'react-router-dom';


type DashboardData = {
    referralsRecieved: number;
    referralsCompleted: number;
    totalDoctor:number
};
const MDdashboard = () => {

  const navigate=useNavigate();
  const[referredPatientsList,setReferredPatients]=useState<any[]>([]);
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
  fetchReferredPatients();
  fetchDashboardData();
},[])

  const fetchReferredPatients = async () => {
   const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
   console.log("datataaaaa",response.data)
    setReferredPatients(response.data);
  };

  const fetchDashboardData=async()=>{
    const response=await axios.get(`http://localhost:8080/app/MDdashboardData/${DoctorId}`)
    console.log("!!!!!!!",response.data)
    setDashboardData(response.data);
  }

  return (
     <Container className='dashboard'>
     
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
          <Card.Title className="mt-2 small font">Referrals Placed</Card.Title>
        </div>

        <div className="d-flex flex-column justify-content-between">
          <Card.Text className="text-end">{dashboardData.referralsCompleted}</Card.Text>
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


          <Table className='table'>
            <thead>
              <tr>
                <th>Patient name</th>
                <th>dob</th>
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
                  <td>{patient.createdAt}</td>
                   <td> {patient.Doctor?.firstName} {patient.Doctor?.lastName}</td>
                     <td>
             {patient.Appointments[0]?.appointmentType === 'consultation' ? (
               new Date(patient.Appointments[0]?.appointmentDate).toISOString().split('T')[0]
               ):'-'}
             </td>

          <td>
             {patient.Appointments[0]?.appointmentType === 'surgery' ? (
               new Date(patient.Appointments[0]?.appointmentDate).toISOString().split('T')[0]
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
        </Container>
  )
}

export default MDdashboard