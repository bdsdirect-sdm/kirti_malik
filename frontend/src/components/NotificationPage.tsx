/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import socket from '../socket';
import config from '../config';
import { Card, Container } from 'react-bootstrap'; // Bootstrap components

interface Notification {
  id: number;
  senderId: number;
  recieverId: number;
  message: string;
  createdAt: string;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const doctorId = localStorage.getItem('DoctorId');
  console.log('Doctor ID:', doctorId);

  useEffect(() => {
    // Listen to incoming notifications from socket
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
    return notificationDate.toLocaleString(); // Formats the date
  };

  return (
    <Container fluid className="mt-4 px-4 notification">
      <h3 className="mb-4 text-center">Notifications</h3>
      <div className="d-flex flex-column align-items-center">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className="mb-3 shadow-sm rounded"
              style={{ width: '100%', maxWidth: '1200px' }}
            >
              <Card.Body>
                <Card.Text style={{fontSize:'15px'}} className='pt-4'>
                  {notification.message}
                </Card.Text>
                <Card.Footer className="text-muted">
                  <small>Received at: {formatDate(notification.createdAt)}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center">No notifications available</p>
        )}
      </div>
    </Container>
  );
};

export default NotificationPage;
