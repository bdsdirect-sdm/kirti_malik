import React from 'react';
import io from 'socket.io-client';
import './style.css';

const socket = io('http://localhost:8080');

const Chat: React.FC = () => {
  return (
    <div className="container-fluid d-flex" style={{ height: '50vh' }}>
    
      <div className="col-2 bg-light p-3" style={{ height: '50vh', overflowY: 'auto' }}>
        <h3>patient</h3>
        <ul className="list-unstyled">
          <li>patient 1</li>
          <li>patient 2</li>
          <li>patient 3</li>
        </ul>
      </div>

      <div className="col-10 d-flex flex-column p-3">
        <div className="chat-header">
          <h3>Chat Room</h3>
        </div>
        <div className="chat-messages flex-grow-1" style={{ overflowY: 'auto' }}>
          
          <div>
            <p><strong>User 1:</strong> Hello!</p>
            <p><strong>User 2:</strong> Hi there!</p>
           
          </div>
        </div>
        <div className="chat-footer mt-auto">
        
          <input type="text" className="form-control" placeholder="Type a message..." />
          <button className=''></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
