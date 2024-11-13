/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {  useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar,Dropdown } from 'react-bootstrap';
import './style.css';
// import logo from "../public/"


const Layout = () => {

 const[name,setName]=useState<any>('null')
 const DoctorId=localStorage.getItem('DoctorId')
 useEffect(()=>{
   const fetchDoctorName=async()=>{
    try{
      const doctor=localStorage.getItem('doctorName');
      setName(doctor);

    }
    catch(error)
    {
     console.log('error fetching doctor',error)
    }
   }
   fetchDoctorName();
 },[]
)

  return (
    <Container fluid className="layout-container">
      <Navbar fixed="top" className="layout-navbar">
        <Container className='navbar1'>
          <Row className="w-100">
            <Col md={6}>
            
              <Navbar.Brand className='eye-text'>
                <img src='/logo.png' alt='image' height='50' width='50'/> Eye Refer</Navbar.Brand>
            </Col>
            <Col md={6} className="text-end">
            
              <Navbar.Text>
                <Dropdown align="end" >
                  <Dropdown.Toggle className='custom-button'>
                    
                  Hi {name} <br/>
                   Welcome Back!
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Change Password</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login">Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Navbar.Text>
            </Col>
          </Row>
        </Container>
      </Navbar>

     
      <Row className="pt-8">
        
        <Col sm={2} className="sidebar">
          <div className="sidebar-content">
            <ul className="list-unstyled">
              <li><Link to={`/dashboard/${DoctorId}`} className="sidebar-link">Dashboard</Link></li>
              <li><Link to="/patients" className="sidebar-link">Patient</Link></li>
              <li><Link to="/doctors" className="sidebar-link">Doctors</Link></li>
              <li><Link to="/chat" className="sidebar-link">Chat</Link></li>
              <li><Link to="/staff" className="sidebar-link">Staff</Link></li>
            </ul>
          </div>
        </Col>

        
        <Col sm={10} className="content-area">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
