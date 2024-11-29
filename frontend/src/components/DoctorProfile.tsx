import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Table } from 'react-bootstrap';
import config from '../config';




interface DoctorInfo {
  firstName: string;
  lastName:string
  dob: string;
  gender: string;
  email:string;
  phoneNumber:number;
  diseaseName:string;
  laterality:string;
  returnPatient:string;
  address: string;
  
}
const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorInfo | null>(null);
  const DoctorId=localStorage.getItem('DoctorId')
 // console.log("hulaaaa",DoctorId)
 // console.log("patientt=====",patientId)
 
 
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/getDoctor/${DoctorId}`);
        setDoctor(response.data);
        console.log("-------",response.data)
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [DoctorId]);

  

  // if (!patientData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div  className='patient-info mb-10 mt-5 ms-4 position-relative'>
     <h2 style={{ fontSize: '18px',fontWeight:'bold' }} className='mt-6 ms-4 pt-4'>Profile</h2>

      <div className="patient-section ms-4 me-4 mt-4">
       <Row>
         <Col md={6}>
             <p className='ms-3 mt-3'><strong>Name:</strong> {doctor?.firstName}  {doctor?.lastName}</p>
             <p className='ms-3 mt-3'><strong>Speciality:</strong> Opthalmologist  </p>
                <p className='ms-3 mt-3'><strong>Location:</strong>  </p>
             
         </Col>

         <Col md={6}>
             <p className='ms-3 mt-3'><strong>Email:</strong> {doctor?.email}</p>
             <p className='ms-3 mt-3'><strong>Phone:</strong> {doctor?.phoneNumber}  </p> 
             
         </Col>
      </Row>      
      </div>

      <h2 style={{ fontSize: '18px',fontWeight:'bold' }} className='mt-7 ms-4 pt-4'>Address information</h2>
      
       <div className="patient-section ms-4 me-4 mt-4">
       <Row>
         <Col md={6}>
             <p className='ms-3 mt-3'><strong>Reason:</strong> {}</p>
             <p className='ms-3 mt-3'><strong>DOB:</strong> {}  </p>
             <p className='ms-3 mt-3'><strong>Patient will return:</strong> {}  </p>
         </Col>

         <Col md={6}>
             <p className='ms-3 mt-3'><strong>Laterality:</strong> {}</p>
             
         </Col>
      </Row>      
      </div>

      
      
      
    </div>
  );
};

export default DoctorProfile;
