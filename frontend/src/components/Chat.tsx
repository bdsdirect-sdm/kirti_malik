/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Navbar, Row } from 'react-bootstrap';
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
  const[search,setSearch]=useState('');
  const[filteredUsers,setFilteredUsers]=useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [roomId, setRoomId] = useState<string>('');
  
  const DoctorId = JSON.parse(localStorage.getItem('DoctorId') || '{}');

  useEffect(() => {
    if (selectedPatient) {
      setRoomId(selectedPatient.id);
    }
    if (roomId) {
      socket.emit('joinRoom', roomId);
      console.log(`Socket joined room ${roomId}`); 
    }
    socket.on('receiveMessage', (newMessage: Message) => {
      console.log('Message received', newMessage.message);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    fetchReferredPatients();

    return () => {
      socket.off('receiveMessage'); 
    };
  }, [ selectedPatient]);

  const fetchReferredPatients = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/patient/${DoctorId}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching referred patients', error);
    }
  };

  const selectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setMessages([]); 
    setRoomId(patient.id);  
  };

  const sendMessage = async () => {
    if (!message.trim()) return; 
    const newMessage: Message = {
      message,
      senderId: DoctorId,
      recieverId: selectedPatient?.ReferredTo,
      patientId: selectedPatient?.id,
      roomId: roomId,
    };

    console.log("Emitting message:", newMessage);
   
    socket.emit('sendMessage', newMessage);  
    //setMessages((prevMessages) => [...prevMessages, newMessage]); 
    setMessage(''); 
    console.log("Message sent", newMessage.message);
  };

  const handleSearch=(event: React.ChangeEvent<HTMLInputElement>)=>{
       setSearch(event.target.value)
  }

 useEffect(() => {
 
    const filteredItems = patients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
    setFilteredUsers(filteredItems);
  }, [patients, search]); 

  return (
    <Row className="mt-0 bg-white border-top ms-1">
      <Col md={3} className="p-3 border-end chat-sidebar">
        <div className="input-group">
          <div className="form-outline" data-mdb-input-init>
            <input type="search" id="form1"  value={search} 
            onChange={handleSearch}
            className="form-control" placeholder='search patient' />
          </div>
        </div>
        <div className='mt-5 ps-1 patient'>
          {filteredUsers.map((patient) => (
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

      <Col md={9} className="d-flex flex-column h-90">
        <Navbar variant="dark" className="mb-3 border-bottom position-static">
          <Navbar.Brand style={{ color: 'black', fontSize: '50' }}>
            {selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Select a patient'}
            <p style={{ fontSize: '15px', color: 'grey' }}>Referred to:</p>
          </Navbar.Brand>
        </Navbar>

        <div className="flex-grow-1 overflowY-auto" style={{ padding: '10px', flex: 1 }}>
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
                <strong>{msg.senderId === DoctorId ? 'You' : 'Other'}:</strong> {msg.message}
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
          <button className='btn btn-outline-success ms-3' onClick={sendMessage}>Send Message</button>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
