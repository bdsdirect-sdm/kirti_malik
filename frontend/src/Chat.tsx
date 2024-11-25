import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Navbar, Row } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

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

    socket.on('message', (newMessage: Message) => {
      if (newMessage.roomId === selectedPatient?.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    fetchReferredPatients();

    return () => {
      socket.off('message');
    };
  }, [DoctorId, selectedPatient]);

  const fetchReferredPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/app/patient/${DoctorId}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching referred patients', error);
    }
  };

  const selectPatient = async (patient: any) => {
    setSelectedPatient(patient);
    const roomId = patient.id;
    try {
      const response = await axios.get(`http://localhost:8080/app/chatHistory/${roomId}`);
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

    await axios.post('http://localhost:8080/app/chat', newMessage);
  };

  return (
    <Container fluid className="h-70">
      <Row className="h-70">
        <Col md={3} className="bg-light p-3" style={{ height: '90vh' }}>
          <h4>Patient List</h4>
          <ListGroup>
            {patients.map((patient) => (
              <ListGroup.Item key={patient.id} onClick={() => selectPatient(patient)}>
                {patient.firstName} {patient.lastName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9} className="d-flex flex-column h-90">
          <Navbar bg="dark" variant="dark" className="mb-3">
            <Navbar.Brand>{selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Select a patient'}</Navbar.Brand>
          </Navbar>

          <div className="flex-grow-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 120px)', padding: '10px' }}>
            <ListGroup>
              {messages.map((msg, index) => (
                <ListGroup.Item
                  key={index}
                  style={{
                    textAlign: msg.senderId === DoctorId ? 'left' : 'right',
                    backgroundColor: msg.senderId === DoctorId ? '#d1ecf1' : '#f8d7da',
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

          <div className="mt-auto p-3">
            <Form>
              <Form.Group controlId="messageInput">
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={sendMessage} className="w-100">
                Send
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
