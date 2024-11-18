/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Dropdown } from 'react-bootstrap';
import './style.css';

const Layout = () => {
  const [name, setName] = useState<string>('User');
  const DoctorId = localStorage.getItem('DoctorId');
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const doctor = localStorage.getItem('doctorName') || 'User';
        setName(doctor);
      } catch (error) {
        console.error('Error fetching doctor name:', error);
      }
    };
    fetchDoctorName();
  }, []);

  return (
    <Container fluid className="layout-container">
     
      <Navbar fixed="top" className="layout-navbar d-flex justify-content-between align-items-center px-3">
       
        <Navbar.Brand className="d-flex align-items-center navbar-brand">
          <img src="/logo.png" alt="Eye Refer Logo" height="50" width="50" className="me-2" />
          <span className='eye-text'>EYE REFER</span>
        </Navbar.Brand>

   
  <Dropdown align="end">
    <Dropdown.Toggle className="custom-dropdown-toggle d-flex">
      <img
         src="/user.jpg" 
         alt="User Icon"
        className="me-2 user-avatar"
        style={{ width: '50px', height: '50px' }} 
      />
   <span className="bold-text dropdown-text">Hi {name}!</span> <br/>
    <span className="dropdown-text">Welcome Back!</span>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Change Password</Dropdown.Item>
      <Dropdown.Item as={Link} to="/login">
        Log out
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>


      </Navbar>

     
      <Row className="custom-margin-top">
        
        <Col sm={2} className="sidebar  vh-100 position-fixed">
          <div className="sidebar-content py-4">
            <ul className="list-unstyled">
              <li>
                <Link to={`/dashboard/${DoctorId}`} className="sidebar-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/patients" className="sidebar-link">
                  Patients
                </Link>
              </li>
              {userType !== 'OD' && (
                <li>
                  <Link to={`/appointment/${DoctorId}`} className="sidebar-link">
                    Appointments
                  </Link>
                </li>
              )}
              <li>
                <Link to="/doctors" className="sidebar-link">
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/chat" className="sidebar-link">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/staff" className="sidebar-link">
                  Staff
                </Link>
              </li>
            </ul>
          </div>
        </Col>

        {/* Main Content */}
        <Col sm={10} className="content-area offset-sm-2 bg-grey py-3">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
