import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chat.css'; 

const socket = io('http://localhost:8080');

interface ChatComponentProps {
    userId: string;   
    agencyId: string; }

interface Message {
    senderId: number; 
    recieverId: number; 
    messageContent: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userId, agencyId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        const room = `${userId}_${agencyId}`;
        
        socket.emit('join_room', room);
        
        socket.on('receive_message', (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.emit('leave_room', room);
        };
    }, [userId, agencyId]);

    const sendMessage = async () => {
        if (currentMessage.trim()) {
            const newMessage: Message = { 
                senderId: Number(userId), 
                recieverId: Number(agencyId), 
                messageContent: currentMessage 
            };

            console.log('Sending message:', newMessage);
            socket.emit('send_message', { ...newMessage, room: `${userId}_${agencyId}` });

            try {
                const response = await fetch('http://localhost:8080/app/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const savedMessage = await response.json(); 
                console.log('Message saved:', savedMessage);
                
            } catch (error) {
                console.error('Error sending message to server:', error);
            }

            setMessages((prevMessages) => [...prevMessages, newMessage]); 
            setCurrentMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === Number(userId) ? 'sent' : 'received'}`}>
                        <strong>{msg.senderId === Number(userId) ? 'You' : 'Agency'}:</strong> {msg.messageContent}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type a message"
                    className="message-input"
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
