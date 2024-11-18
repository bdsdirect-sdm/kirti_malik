import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Table,  } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
     

          <Row className="mb-4 pt-0">
             <h5>Dashboard</h5>
            <Col>
            <Card  className="custom-card">
              <Card.Body className="d-flex">
                 <div className="d-flex flex-column me-3">
                  <div>
                        <img src="/diversity_2.png" alt="Referral Icon" className="img-fluid" style={{ width: '50px', height: '50px' }} />
                  </div>
                 
                 <Card.Title className="mt-2 small font">Referrals Placed</Card.Title>
                </div>
    
 
               <div className="d-flex flex-column justify-content-between">
                <Card.Text className="text-end">{dashboardData.referralsPlaced}</Card.Text>
                 <hr />
               <small className="text-muted">Last Updated: {}</small>
              </div>
             </Card.Body>
             </Card>

            </Col>
            <Col>
             <Card  className="custom-card">
              <Card.Body className="d-flex">
                 <div className="d-flex flex-column  me-3">
                  <div>
                        <img src="/personal_injury.png" alt="Referral Icon" className="img-fluid" style={{ width: '50px', height: '50px' }} />
                  </div>
                 
                 <Card.Title className="mt-2 small font">Referrals completed </Card.Title>
                </div>
    
 
               <div className="d-flex flex-column justify-content-between">
                <Card.Text className="text-end">{dashboardData.referralsCompleted}</Card.Text>
                 <hr />
               <small className="text-muted">Last Updated: Aug:20</small>
              </div>
             </Card.Body>
             </Card>
            </Col>


            <Col>
             <Card  className="custom-card">
              <Card.Body className="d-flex">
                 <div className="d-flex flex-column  me-3">
                  <div>
                        <img src="/stethoscope.png" alt="Referral Icon" className="img-fluid" style={{ width: '50px', height: '50px' }} />
                  </div>
                 
                 <Card.Title className="mt-2 small font">MD count </Card.Title>
                </div>
    
 
               <div className="d-flex flex-column justify-content-between">
                <Card.Text className="text-end">{dashboardData.mdCount}</Card.Text>
                 <hr />
               <small className="text-muted">Last Updated: {}</small>
              </div>
             </Card.Body>
             </Card>
            </Col>
          </Row>

       <div className="d-flex justify-content-end  ">
          <Button onClick={handleAddPatient} className='btn-color'>
             Add Referral Patient 
             </Button>
                  </div>

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
                   <td>{patient.Doctor?.firstName}{patient.Doctor?.lastName}</td>
                    <td></td> 
                    <td></td> 
                  <td>{patient.status}</td>   
                  <td>{patient.returnPatient}</td>
                  <td></td> 
                  <td><Link to="/chat">link</Link></td> 
                   <td className="actions">
            
              </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
    </Container>
  );
};

export default ODdashboard;
