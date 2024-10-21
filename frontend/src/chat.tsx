import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chat.css';
const socket = io('http://localhost:8080');

const ChatForm: React.FC = () => {
    const[name,setName]=useState<string>('')
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);


    useEffect(() => {
        socket.on('receiveMessage', (data: {name:string,message:string}) => {
            setMessages((messages) => [...messages, ]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim()) {
            socket.emit('sendMessage', message);
            setMessage('');
            console.log(`message sent ${message}`)
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Chat Room</h4>
                </div>
                <div className="card-body">
                    <div className="chat-window" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: '#f8f9fa' }}>
                        <ul>
                            {messages.map((message,index)=>(
                                <li key={index}>
                                    {message.name}:{message.message}

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card-footer">
                    <form onSubmit={handleSubmit} className="d-flex">
                        <input
                        type='text'
                        className='form-control me-2'
                        placeholder='enter your name'
                        onChange={(e)=>setName(e.target.value)}>
                            
                        </input>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="btn btn-success">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatForm;
