import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:8080');

interface Message {
  senderId?: string;
  recieverId?: string;
  messageContent: string;
  senderName?: string;
}

const ChatForm: React.FC = () => {
  const { senderId, recieverId ,userType} = useParams();
  console.log("user type===",userType)
  const [messageContent, setMessageContent] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
 
  useEffect(() => {
    if (recieverId) {
      const getMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/app/getMessage/${senderId}/${recieverId}`);
          if (response.data) {
            setMessages(response.data);
          }
        } catch (error) {
          console.log("Error fetching messages");
        }
      };
      getMessages();

      socket.on('receiveMessage', (data) => {
        if (data.recieverId === senderId) {
          setMessages((msgContent) => [...msgContent, data]);
        }
      });
    }

    return () => {
      socket.off('receiveMessage');
    };
  }, [recieverId, senderId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (messageContent.trim()) {
      const newMessage: Message = {
        senderId,
        recieverId,
        messageContent,
      
      };

      socket.emit('sendMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await axios.post('http://localhost:8080/app/sendMessage', newMessage);
        console.log('Message saved', response.data);
        setMessageContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-12">
          <div className="d-flex">
            <div className="card flex-fill" style={{ borderRadius: "15px" }}>
              <div className="card-header d-flex justify-content-between align-items-center bg-info text-white" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                <button className="btn btn-light btn-sm">
                  <i className="fas fa-angle-left" />
                </button>
                <h5 className="mb-0">Chat Room with </h5>
                <button className="btn btn-light btn-sm">
                  <i className="fas fa-times" />
                </button>
              </div>

              <div className="card-body">
                <div className="chat-window" style={{ height: '300px', overflowY: 'scroll' }}>
                  {messages.map((msg, index) => (
                    <div key={index} className={`d-flex flex-row mb-4 ${msg.senderId === senderId ? 'justify-content-end' : 'justify-content-start'}`}>
                      {msg.senderId !== senderId && (
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar"
                          style={{ width: "45px", height: "100%" }}
                        />
                      )}
                      <div className={`p-3 ${msg.senderId === senderId ? 'me-3 border' : 'ms-3'} ${msg.senderId === senderId ? 'bg-light' : 'bg-info text-white'}`} style={{ borderRadius: "15px" }}>
                        <p className="small mb-0"><strong>{msg.senderName}</strong>: {msg.messageContent}</p>
                      </div>
                      {msg.senderId === senderId && (
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                          alt="avatar"
                          style={{ width: "45px", height: "100%" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Type your message"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-2">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
