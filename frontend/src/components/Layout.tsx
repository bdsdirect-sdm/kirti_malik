/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Dropdown } from 'react-bootstrap';
import './style.css';

// import toast from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [name, setName] = useState<string>('User');
  // const[notificationCount,setNotificationCount]=useState(0);

  const DoctorId = localStorage.getItem('DoctorId');
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    fetchDoctorName();
  }, []);

  const fetchDoctorName = async () => {
      try {
        const doctor = localStorage.getItem('doctorName') || 'User';
        setName(doctor);
      } catch (error) {
        console.error('Error fetching doctor name:', error);
      }
    };

  return (
    <Container fluid className="layout-container h-auto ">
     
     <Navbar fixed="top" className="layout-navbar d-flex justify-content-between align-items-center px-3">
       <Navbar.Brand className="d-flex align-items-center navbar-brand">
         <img src="/logo.png" alt="Eye Refer Logo" height="50" width="50" className="me-2" />
         <span className="eye-text">EYE REFER</span>
       </Navbar.Brand>

 
       <div className="d-flex align-items-center">
  
          <Link to="/notification">
           <i className="bi bi-bell-fill me-3" style={{ fontSize: '1.5rem' }}></i>
          </Link>
          <Dropdown align="end">
               <Dropdown.Toggle className="custom-dropdown-toggle d-flex align-items-center">
                <img
                 src="/user.jpg"
                 alt="User Icon"
                 className="me-2 user-avatar"
                 style={{ width: '50px', height: '50px' }}
                  />
              <div className="ms-2">
                <span className="bold-text dropdown-text d-block">Hi {name}!</span>
               <span className="dropdown-text d-block" style={{ fontSize: '0.875rem' }}>Welcome Back!</span>
               </div>
              </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/profile/${DoctorId}`}>Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
        <Dropdown.Item 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
        >
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
</Navbar>


     
      <div className="custom-margin-top d-flex mt-6 ">
        
        <Col className="sidebar mt-90px h-200   ">
          <div className="  sidebar-content py-4 ">
            <ul className="list-unstyled">
              <li>
                <Link to={`/dashboard/${DoctorId}`} className="sidebar-link ">
                 <img src="/home(1).png" alt="Dashboard" className="sidebar-icon" />
                 Dashboard
               </Link>
               </li>
               <li>
              <Link to={`/patients/${DoctorId}`} className="sidebar-link">
              <img src="/patientIcon.png" alt="Patients" className="sidebar-icon" />
               Patients
         </Link>
        </li>
  {userType !== 'OD' && (
    <li>
      <Link to={`/appointment/${DoctorId}`} className="sidebar-link">
        <img src="/date_range.png" alt="Appointments" className="sidebar-icon" />
        Appointments
      </Link>
    </li>
  )}
  <li>
    <Link to="/doctors" className="sidebar-link">
      <img src="/DoctorIcon.png" alt="Doctors" className="sidebar-icon" />
      Doctors
    </Link>
  </li>
  <li>
             <Link to="/chat" className="sidebar-link">
      <img src="/chatIcon.png" alt="Chat" className="sidebar-icon" />
      Chat
    </Link>
  </li>
  <li>
    <Link to="/staff" className="sidebar-link">
    <i className="bi bi-person"></i>
      {/* <img src="/path-to-staff-icon.png" alt="Staff" className="sidebar-icon" /> */}
      Staff
    </Link>
  </li>
</ul>

          </div>
        </Col>

      
        <Col sm={10} className="content-area   ">
          <Outlet />
        </Col>
      </div>
    </Container>
  );
};

export default Layout;
