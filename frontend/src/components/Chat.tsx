/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Navbar, Row } from 'react-bootstrap';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageRecieved, setMessageRecieved] = useState<Message[]>([]);

  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const DoctorId = JSON.parse(localStorage.getItem('DoctorId') || '{}');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('receive_message', (newMessage: Message) => {
      if (newMessage.roomId === selectedPatient?.id) {
        setMessageRecieved((prevMessages) => [...prevMessages, newMessage]);
      }
      console.log("Message received", newMessage);
    });

    fetchReferredPatients();

    return () => {
      socket.off('receive_message');
    };
  }, [DoctorId, selectedPatient]);

  const fetchReferredPatients = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/patient/${DoctorId}`);
      setPatients(response.data);
      console.log("--", response.data);
    } catch (error) {
      console.error('Error fetching referred patients', error);
    }
  };

  const selectPatient = async (patient: any) => {
    setSelectedPatient(patient);
    const doctor=patient.Doctor?.firstName;
    console.log("dddddd",doctor)
    const roomId = patient.id;
    try {
      const response = await axios.get(`${config.BASE_URL}/chatHistory/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  };

  const sendMessage = async () => {
    const newMessage: Message = {
      message,
      senderId: DoctorId,
      recieverId: selectedPatient?.ReferredTo,
      patientId: selectedPatient?.id,
      roomId: selectedPatient?.id,
    };

    socket.emit('message', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
    console.log("Message sent", message);

    // You may want to save the message in the backend here too.
    // await axios.post(`${config.BASE_URL}/chat`, newMessage);
  };

  return (
    <Container fluid className="h-70 chat sm-0">
  <Row className="h-70">
 
 
    <Col md={3} className="p-3 border-end" style={{ height: '90vh' }}>
      <h4>Patient List</h4>
      <div className='mt-5 ps-3 patient'>
        {patients.map((patient) => (
          <div key={patient.id}>
            <p className="ps-3" style={{ fontWeight: '600', marginBottom: '0' }} onClick={() => selectPatient(patient)}>
              {patient.firstName} {patient.lastName}
            </p>
            <p className="ps-3" style={{ color: 'grey', marginTop: '0' }}>
              {patient.Doctor?.firstName} {patient.Doctor?.lastName}
            </p>
          </div>
        ))}
      </div>
    </Col>

 
    <Col md={9} className="d-flex flex-column h-90">
      <Navbar variant="dark" className="mb-3 border-bottom position-static">
        <Navbar.Brand style={{ color: 'black', fontSize: '50' }}>
          {selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Select a patient'}
          <p style={{ fontSize: '15px', color: 'grey' }}>Referred to:</p>
        </Navbar.Brand>
      </Navbar>

      <div className="flex-grow-1 overflowY-auto" style={{ padding: '10px', flex: 1, }}>
        <ListGroup>
          {messages.map((msg, index) => (
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

    
      <div className="border-top chatFooter" style={{ position: 'sticky', bottom: '0', backgroundColor: 'white', zIndex: '1' }}>
        <Form>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form>
      </div>
    </Col>
  </Row>
</Container>

  );
};

export default Chat;
