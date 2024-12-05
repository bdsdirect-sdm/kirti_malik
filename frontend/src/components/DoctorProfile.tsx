import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Table ,Image} from 'react-bootstrap';
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

    <div >
    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className='mt-6 ms-4 pt-4'>Profile</h2>

    <div className='doctor-info mb-10 mt-5  me-4 position-relative'>
        <Row className='ms-2 mt-6'>
            <Col md={6} className='d-flex'>
            <div className='mt-3'>
                 <Image src="/doctor.jpeg" roundedCircle />
            </div>
             <div className='mt-4'>
                 <p className='ms-3 mt-3'><strong>{doctor?.firstName}  {doctor?.lastName}</strong> </p>
                  <p className='ms-3 mt-3'> Opthalmologist</p>
            </div>
                
            </Col>

            <Col md={6} className='mt-4'>
                <button type="button" className="btn btn-primary ms-10">Add address</button>
            </Col>
        </Row>

        <div className="doctor-section ms-4 me-4 mt-6">

            <Row className='mt-5'>
                <Col md={6}>
                    
                     <p className='ms-3 mt-3'><strong>Name:</strong> {doctor?.firstName} {doctor?.lastName}</p>
                      <p className='ms-3 mt-3'><strong>Speciality: </strong>Opthalmologist</p>
                    
                </Col>

                <Col md={6}>
                    <p className='ms-3 mt-3'><strong>Email:</strong> {doctor?.email}</p>
                      <p className='ms-3 mt-3'><strong>Location: </strong></p>
                   
                </Col>
            </Row>
        </div>

       <div className="doctor-section ms-4 me-4 mt-4 ">
        <div className='mt-4'>
                 <p>Address Information</p>
        </div>
       
            <Row className='mb-4'>
                <Col md={6} className='mb-3'>
                    
                     <p className='ms-3 mt-3'><strong>Name:</strong> {doctor?.firstName} {doctor?.lastName}</p>
                      <p className='ms-3 mt-3'><strong>Speciality: </strong>Opthalmologist</p>
                    
                </Col>

                <Col md={6}>
                    <p className='ms-3 mt-3'><strong>Email:</strong> {doctor?.email}</p>
                      <p className='ms-3 mt-3'><strong>Location: </strong></p>
                   
                </Col>
            </Row>
        </div>
    </div>
</div>

    
  );
};

export default DoctorProfile;
