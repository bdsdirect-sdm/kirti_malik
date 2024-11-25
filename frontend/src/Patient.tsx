import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Patient = () => {
  const [referredPatients, setReferredPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage=3;


  const DoctorId = localStorage.getItem('DoctorId');
  const navigate = useNavigate();

  const fetchReferredPatients = async () => {
    const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
    console.log('Fetched Data:', response.data);
    setReferredPatients(response.data);
  };
  const roomId=`${DoctorId}-${referredPatients[0]?.ReferredTo}-${referredPatients[0]?.id}`;
  console.log("room id",roomId)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

//pagination function 

  const indexOfLast=currentPage*itemsPerPage;
  const indexOfFirst=indexOfLast-itemsPerPage;
  const currentProducts=filteredUsers.slice(indexOfFirst,indexOfLast);

  const totalPages=Math.ceil(filteredUsers.length/itemsPerPage)

   const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  useEffect(() => {

    const filteredItems = referredPatients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(search.toLowerCase()); 
    });
    setFilteredUsers(filteredItems);
  }, [search, referredPatients]);

  useEffect(() => {
    fetchReferredPatients();
  }, [DoctorId,]);

  const handleDelete = (patientId: any) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      console.log(`Deleted patient with ID: ${patientId}`);
      const updatedPatients = referredPatients.filter((patient) => patient.id !== patientId);
      setReferredPatients(updatedPatients);
    }
  };

  const handleAddPatient=async()=>{
  navigate(`/add-patient/${DoctorId}`)
}

  return (
    <div>
      <div className='table-heading d-flex justify-content-between align-items-center'>
  <h2 className="pt-4 pb-2" style={{ fontSize: '24px' }}>Referred Patients</h2>
  <Button onClick={handleAddPatient} className='btn-color pt-2 mt-4'>
    <img src='/add.png' alt='button'/>
  </Button>
</div>


      <div className='search-box d-flex'>
        <input
          type="text"
          placeholder="Search by first name or last name"
          value={search}
          onChange={handleSearch}
          className='me-2 flex-grow-1 w-10'
        />
        <button className="custom-btn">Search</button>
      </div>

      <div className="mt-4" style={{ overflowX: 'auto' }}>
        <Table>
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
            {currentProducts.length > 0 ? (
              currentProducts.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.dob}</td>
                  <td>{new Date(patient.createdAt).toISOString().split('T')[0]}</td>
                  <td>{patient.Doctor.firstName} {patient.Doctor.lastName}</td>
                  <td>
                    {patient.Appointment?.appointmentType === 'consultation' ? (
                      new Date(patient.Appointment?.appointmentDate).toISOString().split('T')[0]
                    ) : '-'}
                  </td>
                  <td>
                    {patient.Appointment?.appointmentType === 'surgery' ? (
                      new Date(patient.Appointment?.appointmentDate).toISOString().split('T')[0]
                    ) : '-'}
                  </td>
                  <td>{patient.status}</td>
                  <td>{patient.returnPatient}</td>
                  <td></td>
                  <td><Link to='/chat'>link</Link></td>
                  <td className="actions d-flex">
                    <div className='icon me-1 ' style={{background:'#43D79E'}}>
                      <i className="bi bi-eye-fill"onClick={() => navigate(`/viewPatient/${patient.id}`)} ></i>
                    </div>
                     
                    <div className='icon me-1' style={{background:'#5BE4EC'}}>   
                       <i className=" bi bi-pencil-fill" onClick={() => navigate(`/editPatient/${patient.id}`)}></i>
                    </div>
                     
                     <div className='icon me-1' style={{background:'red'}}>
                         <i className='bi bi-trash-fill' onClick={() => handleDelete(patient.id)}></i>
                     </div>

                   
                   
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>No patients found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>


  <div className="pagination d-flex align-items-center bg-white me-4">
   
    <button 
      onClick={handlePrevPage} 
      disabled={currentPage === 1} 
      className="btn" 
      style={{ width: "40px" }}
    >
      <i className=" bi-arrow-left-short"></i>
    </button>

    <span className="page-info text-center" style={{ fontSize: "16px", fontWeight: "300" }}>
      {currentPage} of {totalPages}
    </span>
  
    <button 
      onClick={handleNextPage} 
      disabled={currentPage === totalPages} 
      className="btn " 
      style={{ width: "40px" }}
    >
     <i className=" bi-arrow-right-short"></i>
    </button>
  </div>
</div>

  );
};

export default Patient;
