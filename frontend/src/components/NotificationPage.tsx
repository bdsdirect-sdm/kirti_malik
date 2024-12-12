/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import socket from '../socket';
import config from '../config';
import { Container } from 'react-bootstrap'; // Bootstrap components

interface Notification {
  id: number;
  senderId: number;
  recieverId: number;
  message: string;
  createdAt: string;
  isRead:boolean
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const doctorId = localStorage.getItem('DoctorId');
  console.log('Doctor ID:', doctorId);

  useEffect(() => {

    socket.on('sendNotification', (notification: Notification) => {
      console.log('Notification received:', notification);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    fetchNotification();
  }, [doctorId]);

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/getNotification/${doctorId}`);
      setNotifications(response.data);
     console.log('Notifications fetched:', response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const formatDate = (date: string) => {
    const notificationDate = new Date(date);
    return notificationDate.toLocaleString(); 
  };
  const handleRead=async(notificationId:number)=>{
    try{
          await axios.put(`${config.BASE_URL}/updateNotification/${notificationId}`)
           setNotifications((prevNotification)=>
            prevNotification.map((notif)=>notif.id===notificationId?
           {...notif,isRead:true}:notif))
    }
    catch(error){
        console.error('error marking notification as read',error)
    }
    
  }

  return (
    <Container fluid className="mt-4 px-4 notification">
      <h3 className="mb-4 text-center">Notifications</h3>
     <div className="d-flex flex-column align-items-center">
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <div
        key={notification.id} 
        className={`notification-item mb-3 p-3 shadow-sm rounded w-100 ${notification.isRead ? 'read': 'unread'}`}
        style={{ maxWidth: '1200px', backgroundColor: '#f8f9fa' }}
        onClick={()=>handleRead(notification.id)}
      >
        <p className="notification-text" style={{ fontSize: '15px' }}>
          {notification.message}
        </p>
        <footer className="notification-footer text-muted">
          <small>Received at: {formatDate(notification.createdAt)}</small>
        </footer>
      </div>
    ))
  ) : (
    <p className="text-center">No notifications available</p>
  )}
</div>

    </Container>
  );
};

export default NotificationPage;
