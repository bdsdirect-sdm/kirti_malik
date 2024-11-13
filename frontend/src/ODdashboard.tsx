import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Table,  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ODdashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({ referralsPlaced: 0, referralsCompleted: 0, mdCount: 0 });
  const[referredPatients,setReferredPatients]=useState<any[]>([]);
  const DoctorId=localStorage.getItem('DoctorId')

  useEffect(() => {
    fetchDashboardData();
    fetchReferredPatients();
  }, []);

  const fetchDashboardData = async () => {
    const response = await axios.get('http://localhost:8080/app/oDdashboardData');
    setDashboardData(response.data);
  };

  const fetchReferredPatients = async () => {
 
    const response = await axios.get('http://localhost:8080/app/referralpatientlist');
    setReferredPatients(response.data);
  };

 

const handleAddPatient=async()=>{
  navigate(`/add-patient/${DoctorId}`)
}

  return (
    <Container className='dashboard'>

          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Referrals Placed</Card.Title>
                  <Card.Text>{dashboardData.referralsPlaced}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Referrals Completed</Card.Title>
                  <Card.Text>{dashboardData.referralsCompleted}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>MD Count</Card.Title>
                  <Card.Text>{dashboardData.mdCount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button onClick={handleAddPatient} variant="secondary" >

            add patient
           
          </Button>

          <Table >
            <thead>
              <tr>
                <th>Patient name</th>
                <th>dob</th>
                <th>Referred on</th>
                <th>Referred to</th>
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
              {referredPatients.map((patient, index) => (
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
                   <td className="actions">
                {/* <button onClick={() => navigate(`/editProduct/${product.id}`)}>Edit</button> */}
                {/* <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => navigate(`/viewProduct/${product.id}`)}>View</button> */}
              </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
    </Container>
  );
};

export default ODdashboard;
