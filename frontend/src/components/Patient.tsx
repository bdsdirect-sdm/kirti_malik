/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {  Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import config from '../config';
import Pagination from './Pagination'; 


const Patient = () => {
  const [referredPatients, setReferredPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const DoctorId = localStorage.getItem('DoctorId');
  const navigate = useNavigate();

  const fetchReferredPatients = async () => {
    const response = await axios.get(`${config.BASE_URL}/patient/${DoctorId}`);
    console.log('Fetched Data:', response.data);
    setReferredPatients(response.data);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
  }, [DoctorId]);

  const handleDelete = (patientId: any) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      console.log(`Deleted patient with ID: ${patientId}`);
      const updatedPatients = referredPatients.filter((patient) => patient.id !== patientId);
      setReferredPatients(updatedPatients);
    }
  };

  //function to download csv file

  const downloadCSV=async()=>{
    try{

      const response=await axios.get(`${config.BASE_URL}/generateCSV`)
      const blob=new Blob([response.data],{type:'text/csv'});
      const url=window.URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=url;
      link.download='patient_info.csv';
      document.body.appendChild(link);
      link.click();

     document.body.removeChild(link)
    }
    catch(error){
      console.error('error downloading the csv file',error)

    }
  }

  

  return (
    <div className='ms-5 me-5'>
      <div className='table-heading ms-2 d-flex justify-content-between align-items-center'>
        <h2 className="pt-4 pb-2" style={{ fontSize: '24px' }}>Referred Patients</h2>
      </div>

      <div className='search-box d-flex'>
        <input
          type="text"
          placeholder="Search by first name or last name"
          value={search}
          onChange={handleSearch}
          className='me-2 flex-grow-1'
        />
        <button className="custom-btn">Search</button>
      </div>

    <div>
      <button className="custom-btn" onClick={downloadCSV}>download csv</button>
    </div>

   
      <div className="mt-4 me-4" style={{ overflowX: 'auto' }}>
        <Table className='w-100 me-4'>
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
                    <div className='icon me-1' style={{ background: '#43D79E' }}>
                      <i className="bi bi-eye-fill" onClick={() => navigate(`/viewPatient/${patient.id}`)}></i>
                    </div>

                    <div className='icon me-1' style={{ background: '#5BE4EC' }}>
                      <i className="bi bi-pencil-fill" onClick={() => navigate(`/editPatient/${patient.id}`)}></i>
                    </div>

                    <div className='icon me-1' style={{ background: 'red' }}>
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

      {/* Pagination Container */}
      <div className="mt-3 ms-4">
        <Pagination 
          filteredItems={filteredUsers}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Patient;
