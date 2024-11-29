import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, ListGroup, Navbar, Row } from 'react-bootstrap';
import socket from '../socket';
import config from '../config';

interface Message {
  message: string;
  senderId: string;
  recieverId: string;
  patientId: string;
  roomId: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<Message[]>([]);  // Sent messages state
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);  // Received messages state

  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const DoctorId = JSON.parse(localStorage.getItem('DoctorId') || '{}');

 
  useEffect(() => {
    console.log(socket.on("connected", (message) => {
      console.log(message);
    }));

    console.log("recieve message")
    socket.on('receiveMessage', (newMessage: Message) => {
      
      if (newMessage.roomId === selectedPatient?.id) {
        setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      console.log('Message received', newMessage);
    });

    fetchReferredPatients();
  }, [socket]);

  // Fetch referred patients for the doctor
  const fetchReferredPatients = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/patient/${DoctorId}`);
      setPatients(response.data);
      console.log("--", response.data);
    } catch (error) {
      console.error('Error fetching referred patients', error);
    }
  };

  // Select a patient and fetch their chat history
  const selectPatient = async (patient: any) => {
    setSelectedPatient(patient);
    const roomId = patient.id;

    try {
      const response = await axios.get(`${config.BASE_URL}/chatHistory/${roomId}`);
      setSentMessages(response.data); // Set initial sent messages (if any)
      setReceivedMessages([]); // Clear previous messages when selecting new patient
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    const newMessage: Message = {
      message,
      senderId: DoctorId,
      recieverId: selectedPatient?.ReferredTo,
      patientId: selectedPatient?.id,
      roomId: selectedPatient?.id,  
    };

    socket.emit('sendMessage', newMessage); // Emit the message to the server
    setSentMessages((prevMessages) => [...prevMessages, newMessage]); // Add sent message to state
    setMessage(''); // Clear input field
    console.log("Message sent", message);
  };

  return (
    <Row className="mt-0 bg-white border-top ms-1">
      {/* Left Sidebar (Patients List) */}
      <Col md={3} className="p-3 border-end" style={{ height: '90vh' }}>
        <div className="input-group">
          <div className="form-outline" data-mdb-input-init>
            <input type="search" id="form1" className="form-control" placeholder='search patient' />
          </div>
        </div>
        <div className='mt-5 ps-1 patient'>
          {patients.map((patient) => (
            <div key={patient.id}>
              <p className="ps-3 fw-semibold mb-0" onClick={() => selectPatient(patient)}>
                {patient.firstName} {patient.lastName}
              </p>
              <p className="ps-3" style={{ color: 'grey', marginTop: '0' }}>
                {patient.Doctor?.firstName} {patient.Doctor?.lastName}
              </p>
            </div>
          ))}
        </div>
      </Col>

      {/* Chat Area (Messages and Chat Input) */}
      <Col md={9} className="d-flex flex-column h-90">
        <Navbar variant="dark" className="mb-3 border-bottom position-static">
          <Navbar.Brand style={{ color: 'black', fontSize: '50' }}>
            {selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Select a patient'}
            <p style={{ fontSize: '15px', color: 'grey' }}>Referred to:</p>
          </Navbar.Brand>
        </Navbar>

        <div className="flex-grow-1 overflowY-auto" style={{ padding: '10px', flex: 1 }}>
          <ListGroup>
          
            {sentMessages.map((msg, index) => (
              <ListGroup.Item
                key={index}
                style={{
                  textAlign: msg.senderId === DoctorId ? 'left' : 'right',
                  backgroundColor: msg.senderId === DoctorId ? '#BAEED9' : '#D3D3D3',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  padding: '10px',
                  maxWidth: '80%',
                  marginLeft: msg.senderId === DoctorId ? '0' : 'auto',
                  marginRight: msg.senderId === DoctorId ? 'auto' : '0',
                }}
              >
                <strong>{msg.senderId === DoctorId ? 'You' : msg.senderId}:</strong> {msg.message}
              </ListGroup.Item>
            ))}

           
            {receivedMessages.map((msg, index) => (
              <ListGroup.Item
                key={index}
                style={{
                  textAlign: msg.senderId === DoctorId ? 'left' : 'right',
                  backgroundColor: msg.senderId === DoctorId ? '#BAEED9' : '#D3D3D3',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  padding: '10px',
                  maxWidth: '80%',
                  marginLeft: msg.senderId === DoctorId ? '0' : 'auto',
                  marginRight: msg.senderId === DoctorId ? 'auto' : '0',
                }}
              >
                <strong>{msg.senderId === DoctorId ? 'You' : msg.senderId}:</strong> {msg.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div className="border-top chatFooter mb-5 d-flex" style={{ position: 'sticky', bottom: '0', backgroundColor: 'white', zIndex: '1' }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='btn btn-outline-success ms-3' onClick={sendMessage}>send message</button>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
