/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import config from '../config';


const Staff = () => {
  const [showModal, setShowModal] = useState(false); 
  const[staffList,setStaffList]=useState<any[]>([]);
  const doctorId=localStorage.getItem('DoctorId')
 // console.log("_____",doctorId)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    doctorId:doctorId
  }); 

  useEffect(()=>{
    getStaffList();

  },[])

  const getStaffList=async()=>{
    try{
       const response=await axios.get(`${config.BASE_URL}/getStaff/${doctorId}`);
       setStaffList(response.data)
    }
    catch (error) {
      console.error('Error fetching staff', error);
    }
  }
  //const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

 
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
     
    const response =  await axios.post(`${config.BASE_URL}/addStaff/${doctorId}`, formData);
      alert('Staff added successfully');
      setFormData( response.data); 
      handleCloseModal(); 
    } catch (error) {
      console.error('Error adding staff', error);
    }
  };

  return (
    <div className="ms-5 me-5">
      <div className="table-heading ms-2 d-flex justify-content-between align-items-center">
        <h2 className="pt-4 pb-2" style={{ fontSize: '24px' }}>Staff List</h2>

       
        <Button
          variant="primary"
          onClick={handleShowModal}
          className="add-staff-btn"
        >
          Add Staff
        </Button>
      </div>

      <div className="search-box d-flex">
        <input
          type="text"
          placeholder="Search by first name or last name"
          className="me-2 flex-grow-1"
        />
        <button className="custom-btn">Search</button>
      </div>

      <div className="mt-4 me-4" style={{ overflowX: 'auto' }}>
        <Table className="w-100 me-4">
          <thead>
            <tr>
              <th>Staff name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
           {staffList.map((staff,index)=>(
            <tr key={index} >
                <td>{staff.firstName} {staff.lastName}</td>
                 <td>{staff.email} </td>
                 <td>{staff.phoneNumber}</td>
                  <td>{staff.gender} </td>
            </tr>
           ))}
          </tbody>
        </Table>
      </div>

    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              save
            </Button>
          </Form>
        </Modal.Body>

        
      </Modal>
    </div>
  );
};

export default Staff;
