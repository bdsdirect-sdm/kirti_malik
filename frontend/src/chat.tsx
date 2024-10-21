import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chat.css';

const socket = io('http://localhost:8080');

interface ChatComponentProps {
    userId: string;   
    agencyId: string; 
}

interface Message {
    senderId: number; 
    receiverId: number; 
    messageContent: string;
    timestamp: string; 
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userId, agencyId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        const room = `${userId}_${agencyId}`;
        
     
        socket.emit('join_room', room);
        console.log(`Joined room: ${room}`);

        socket.on('receive_message', (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        
        return () => {
            socket.emit('leave_room', room);
            socket.off('receive_message');
        };
    }, [userId, agencyId]);

    const sendMessage = async () => {
        if (currentMessage.trim()) {
            const newMessage: Message = { 
                senderId: Number(userId), 
                receiverId: Number(agencyId), 
                messageContent: currentMessage,
                timestamp: new Date().toLocaleString() 
            };

            console.log("message to be sent",newMessage)
          
            socket.emit('send_message', { ...newMessage, room: `${userId}_${agencyId}` });
            console.log('Sending message:', newMessage);

          
            try {
                const response = await fetch('http://localhost:8080/app/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                console.log("message saved ")
                if (!response.ok) {
                    throw new Error('Failed to save message on the server');
                }

                const savedMessage = await response.json(); 
                console.log('Message saved on the server:', savedMessage);
            } catch (error) {
                console.error('Error saving message to the server:', error);
            }

            // Update local state with the new message
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setCurrentMessage(''); // Clear input field
        }
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.senderId === Number(userId) ? 'sent' : 'received'}`}
                    >
                        <strong>{msg.senderId === Number(userId) ? 'You' : 'Agency'}:</strong> {msg.messageContent}
                        <div className="timestamp">{msg.timestamp}</div>
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
