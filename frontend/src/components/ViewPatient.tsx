import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap';
import config from '../config';


interface Doctor {
  firstName: string;
  lastName: string;
 
}

interface Appointment{
  appointmentType: string;
  appointmentDate:string;
  status:string;
  
}

interface PatientData {
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
  Doctor?: Doctor;
  Appointment: Appointment;
}
const ViewPatient: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const {patientId}=useParams();
 // console.log("patientt=====",patientId)
 
 
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/viewPatient/${patientId}`);
        setPatientData(response.data.patientInfo);
        console.log("-------",response.data.patientInfo)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  

  if (!patientData) {
    return <div>Loading...</div>;
  }

const downloadPDF=async()=>{
    try{
      const response=await axios.get(`${config.BASE_URL}/generatePDF/${patientId}`,{
        responseType:'arraybuffer'
      });
      const blob=new Blob([response.data],{type:'application/pdf'});
        const url=window.URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=url;
      link.download='patient_info.pdf';
      document.body.appendChild(link);
      link.click();

     document.body.removeChild(link)
    }
    catch(error){
      console.error('error downloading the pdf file')
    }
  }

 return (
  <div className="patient-info mt-5 ms-4 position-relative">
    <div>
      <button className="custom-btn" onClick={downloadPDF}>download pdf</button>
    </div>
    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className='mt-6 ms-4 pt-4'>Basic Information</h2>

    <div className="patient-section ms-4 me-4 mt-4">
      <Row>
        <Col md={6}>
          <p className='ms-3 mt-3'><strong>Name:</strong> {patientData.firstName} {patientData.lastName}</p>
          <p className='ms-3 mt-3'><strong>DOB:</strong> {patientData.dob}</p>
          <p className='ms-3 mt-3'><strong>Phone:</strong> {patientData.phoneNumber}</p>
        </Col>

        <Col md={6}>
          <p className='ms-3 mt-3'><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
        </Col>
      </Row>
    </div>

    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className='mt-7 ms-4 pt-4'>Reason of consult</h2>

    <div className="patient-section ms-4 me-4 mt-4">
      <Row>
        <Col md={6}>
          <p className='ms-3 mt-3'><strong>Reason:</strong> {patientData.diseaseName}</p>
          {/* <p className='ms-3 mt-3'><strong>DOB:</strong> {patientData.dob}</p> */}
          <p className='ms-3 mt-3'><strong>Patient will return:</strong> {patientData.returnPatient}</p>
        </Col>

        <Col md={6}>
          <p className='ms-3 mt-3'><strong>Laterality:</strong> {patientData.laterality}</p>
        </Col>
      </Row>
    </div>

    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className='mt-7 ms-4 pt-4'>Referral To</h2>

    <div className="patient-section ms-4 me-4 mt-4">
      <Row>
        <Col md={6}>
          <p className='ms-3 mt-3'><strong>Doctor Name:</strong> {patientData.Doctor?.firstName}</p>
          <p className='ms-3 mt-3'><strong>Location:</strong> {} </p>
        </Col>
      </Row>
    </div>

    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className='mt-7 ms-4 pt-4'>Appointment History</h2>

    <div className="patient-section ms-4 me-4 mt-4 mb-3">
      <Table>
        <thead>
          <tr>
            <th className='text-center'>Type</th>
            <th className='text-center'>Date</th>
            <th className='text-center'>Status</th>
          </tr>
        </thead>
        <tbody>
          {patientData.Appointment ? (
            <tr>
              <td>{patientData.Appointment?.appointmentType}</td>
               <td>{patientData.Appointment?.appointmentDate}</td>
                  <td>{patientData.Appointment?.status}</td>
            </tr>
          ) : (
            <tr>
              <td>No appointments available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  </div>
);

};

export default ViewPatient;
