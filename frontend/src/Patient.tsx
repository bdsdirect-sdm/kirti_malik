import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import './style.css'

const Patient = () => {

  const[referredPatients,setReferredPatients]=useState<any[]>([]);
  const[search,setSearch]=useState('')
  const DoctorId=localStorage.getItem('DoctorId')
  const navigate=useNavigate()
  
   const fetchReferredPatients = async () => {
   const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
   //console.log("datataaaaa",response.data)
    setReferredPatients(response.data);
  };

  useEffect(()=>{
  fetchReferredPatients();
},[DoctorId])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
   
  };
 
  const handleDelete = (patientId:any) => {
 
  if (window.confirm('Are you sure you want to delete this patient?')) {
  
    console.log(`Deleted patient with ID: ${patientId}`); 
    const updatedPatients = referredPatients.filter(patient => patient.id !== patientId);
    setReferredPatients(updatedPatients); 
  }
};

  
  return (
    <div>
      <div className='table-heading'>
       <h2 className="pt-4 pb-2" style={{ fontSize: '24px' }}>Referred Patients</h2>
      </div>

   <div className='search-box d-flex'>
  <input
    type="text"
    placeholder="Search "
    value={search}
    onChange={handleSearch}
    className='me-2 flex-grow-1 w-10'
  />
  <button className="custom-btn">Search</button> 
</div>

      
      <div className=" mt-4"style={{ overflowX: 'auto' }}>
             <Table >
            <thead>
              <tr>
                <th>Patient name</th>
                <th>DOB</th>
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
                  <td>{new Date(patient.createdAt).toISOString().split('T')[0]}</td>
                   <td>{patient.Doctor.firstName} {patient.Doctor.lastName}</td>
                    <td>
                       {patient.Appointments[0]?.appointmentType === 'consultation' ? (
                       new Date(patient.Appointments[0]?.appointmentDate).toISOString().split('T')[0]
                          ):'-'}
                       </td>

                      <td>
                      {patient.Appointments[0]?.appointmentType === 'surgery' ? (
                        new Date(patient.Appointments[0]?.appointmentDate).toISOString().split('T')[0]
                         ):'-'}
                     </td>
                   <td>{patient.status}</td>
                  <td>{patient.returnPatient}</td>
                  <td></td> 
                  <td><Link to="/chat">link</Link></td> 
                   <td className="actions">
                <button onClick={() => navigate(`/editPatient/${patient.id}`)}>Edit</button>
                 <button onClick={() => handleDelete(patient.id)}>Delete</button>
                <button onClick={() => navigate(`/viewPatient/${patient.id}`)}>View</button> 
              </td>
                </tr>
              ))}
            </tbody>
          </Table>
         </div>
     
        </div>
  )
}

export default Patient;