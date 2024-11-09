import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ODdashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({ referralsPlaced: 0, referralsCompleted: 0, mdCount: 0 });
  const [mdList, setMdList] = useState([]);
  const [referredPatients, setReferredPatients] = useState([]);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchDashboardData();
    fetchMDList();
    fetchReferredPatients();
  }, []);

  const fetchDashboardData = async () => {
    const response = await axios.get('/api/dashboard/od-dashboard');
    setDashboardData(response.data);
  };

  const fetchMDList = async () => {
    const response = await axios.get('/api/dashboard/md-list');
    setMdList(response.data);
  };

  const fetchReferredPatients = async () => {
    const response = await axios.get('/api/dashboard/referred-patients');
    setReferredPatients(response.data);
  };

 

const handleAddPatient=async()=>{
  navigate('/add-patient')
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

          <Button onClick={handleAddPatient} variant="primary" >

            add patient
           
          </Button>

        

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {referredPatients.map((patient, index) => (
                <tr key={index}>
                  {/* <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.reason}</td>
                  <td>{patient.status}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        
    </Container>
  );
};

export default ODdashboard;
