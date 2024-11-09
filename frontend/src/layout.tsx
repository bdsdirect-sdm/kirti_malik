import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';


const Layout = () => {
  return (
    <Container fluid className="layout-container">
      {/* Header */}
      <Navbar bg="primary" variant="dark" fixed="top" className="layout-navbar">
        <Container>
          <Row className="w-100">
            <Col md={6}>
              <Navbar.Brand>Eye Refer</Navbar.Brand>
            </Col>
            <Col md={6} className="text-end">
              <Navbar.Text>Doctor Profile</Navbar.Text>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Row className="pt-5">
        {/* Sidebar */}
        <Col md={3} className="sidebar">
          <div className="sidebar-content">
            <ul className="list-unstyled">
              <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
              <li><Link to="/patients" className="sidebar-link">Patient</Link></li>
              <li><Link to="/doctors" className="sidebar-link">Doctors</Link></li>
              <li><Link to="/chat" className="sidebar-link">Chat</Link></li>
              <li><Link to="/staff" className="sidebar-link">Staff</Link></li>
            </ul>
          </div>
        </Col>

        {/* Content Area */}
        <Col md={9} className="content-area">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
