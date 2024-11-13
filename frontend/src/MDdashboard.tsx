import React, { useEffect, useState } from 'react'
import { Button,  Row, Col, Card, Table,  } from 'react-bootstrap';
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MDdashboard = () => {

  const navigate=useNavigate();
  const[referredPatientsList,setReferredPatients]=useState<any[]>([]);
  const DoctorId=localStorage.getItem('DoctorId')
  console.log('eeeeeeee',DoctorId)

const handleAddAppointment=async()=>{
  navigate('/addAppointment')

}
useEffect(()=>{
  fetchReferredPatients();
},[])

  const fetchReferredPatients = async () => {
   const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
   console.log("datataaaaa",response.data)
    setReferredPatients(response.data);
  };

  return (
    <div>
      <Row className="mb-4">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Referrals Placed</Card.Title>
                  {/* <Card.Text>{dashboardData.referralsPlaced}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Referrals Completed</Card.Title>
                  {/* <Card.Text>{dashboardData.referralsCompleted}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>MD Count</Card.Title>
                  {/* <Card.Text>{dashboardData.mdCount}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button onClick={handleAddAppointment} variant="secondary" >
            Add Appointment        
          </Button>

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
                   <td>{patient.MDdoctor}</td>
                    <td></td> 
                    <td></td> 
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
  )
}

export default MDdashboard