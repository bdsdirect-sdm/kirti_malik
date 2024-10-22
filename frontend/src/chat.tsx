import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:8080');

interface Message{
    senderId:string;
    recieverId:string;
    messageContent:string;
}

const ChatForm: React.FC= () => {
    //get sender and reciverid from params

    const{senderId}=useParams();
    const{recieverId}=useParams()
    const [messageContent, setMessageContent] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]); 

    useEffect(() => {

         const getMessages=async()=>{
            try{
                const response=await axios.get(`http://localhost:8080/app/getMessage/${senderId}/${recieverId}`);
                if(response.data)
                {
                    setMessages(response.data)
                }
            }
            catch(error){
                console.log("error fetching messages")
            }
         }

          getMessages();

        socket.on('receiveMessage', (data) => {
            setMessages((messageContent) => [...messageContent, data]);
        });


        return () => {
            socket.off('receiveMessage');
        };
    }, [senderId,recieverId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        if (messageContent.trim()) {
        
            socket.emit('sendMessage', {
                senderId,
                recieverId,
                messageContent
            });

            console.log("message sent")
            try {
                 const response=await axios.post('http://localhost:8080/app/sendMessage',{
                    senderId,
                    recieverId,
                    messageContent
                 })
                console.log('message saved',response.data);
                setMessageContent('');
               
               
            } catch (error) {
                console.error('Error sending message:', error);
            }
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
                            {messages.map((msg, index) => (
                                <li key={index} className={msg.senderId===senderId?'message-sent':'message-recieved'}>
                                  <span className='sender'>{msg.senderId}</span>{msg.messageContent}
                                  
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card-footer">
                    <form onSubmit={handleSubmit} className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Type your message..."
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                        />
                        <button type="submit" className="btn btn-success">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatForm;
