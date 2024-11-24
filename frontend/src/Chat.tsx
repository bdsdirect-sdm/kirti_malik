import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


const socket: Socket = io('http://localhost:8080');

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>(''); // Input message
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]); // Chat history

  useEffect(() => {
    // Handle receiving messages
    socket.on('receive_message', (data: { sender: string; text: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return; // Prevent empty messages

    // Send message to server
    socket.emit('message', { sender: 'OD Doctor', text: message }); // Replace 'OD Doctor' with dynamic sender name

    // Add to chat history
    setMessages((prevMessages) => [...prevMessages, { sender: 'You', text: message }]);
    setMessage(''); // Clear input
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-3 shadow">
            <Card.Body>
              <Card.Title>Chat Room</Card.Title>
              <div
                className="border rounded p-3 mb-3"
                style={{ height: '300px', overflowY: 'scroll', backgroundColor: '#f8f9fa' }}
              >
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong>{msg.sender}:</strong> <span>{msg.text}</span>
                  </div>
                ))}
              </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </Form.Group>
                <Button variant="primary" onClick={sendMessage}>
                  Send
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
