import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../config';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MDdoctors = () => {
 const[MDdoctors,setMDdoctors]=useState<any[]>([]);

 useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/getmddoctor`);
        setMDdoctors(response.data);
        console.log("doctottttttt",response.data)
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);



  return (
    <div>
      <div className='table-heading d-flex justify-content-between align-items-center'>
        <h2 className="pt-4 pb-2" style={{ fontSize: '24px' }}>Doctors List</h2>
       
      </div>

      <div className='search-box d-flex h-20'>
        <input
          type="text"
          placeholder="Search by first name or last name"
          // value={search}
          // onChange={handleSearch}
          className='me-2 flex-grow-1 w-10'
        />
        <button className="custom-btn">Search</button>
      </div>

      <div className="mt-4" style={{ overflowX: 'auto' }}>
        <Table>
          <thead>
            <tr >
              <th>Doctor name</th>
              <th>Referal placed</th>
              <th>Referred completed</th>
              <th>Avg time of contact</th>
              <th>Avg time of consult</th>
              <th>Phone</th>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
            {MDdoctors.length > 0 ? (
              MDdoctors.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.firstName} {doctor.lastName}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>-</td>
                  <td>{doctor.email}</td>
                  
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
    </div>
  );
};



export default MDdoctors;