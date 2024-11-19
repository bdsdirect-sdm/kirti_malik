import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';




const Patient = () => {

  const[referredPatients,setReferredPatients]=useState<any[]>([]);
  const[search,setSearch]=useState('')
  const DoctorId=localStorage.getItem('DoctorId')
  
   const fetchReferredPatients = async () => {
   const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
   console.log("datataaaaa",response.data)
    setReferredPatients(response.data);
  };

  useEffect(()=>{
  fetchReferredPatients();
},[DoctorId])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // setCurrentPage(1);
  };
 
  
  return (
    <div>
      <div className='table-heading'>
        <h2>Referred Patients</h2>
      </div>

       <input
        type="text"
        placeholder="Search by product name"
        value={search}
        onChange={handleSearch}
      />
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
                  <td><Link to="/chat">link</Link></td> 
                   <td className="actions">
                {/* <button onClick={() => navigate(`/editProduct/${product.id}`)}>Edit</button> */}
                {/* <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => navigate(`/viewProduct/${product.id}`)}>View</button> */}
              </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
  )
}

export default Patient;