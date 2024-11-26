import { Socket } from 'socket.io';
import Message from '../models/message.model';
import Notification from '../models/notification.model';


export const sendMessage = (socket: Socket) => {
  socket.on('message', async (messageData: { patientId: string, senderId: string, recieverId: string, message: string, roomId: string }) => {
    try {
      const { patientId, senderId, recieverId, message, roomId } = messageData;

      
      const newMessage = new Message({
        message,
        senderId,
        recieverId,
        patientId,
        roomId,
      });

      await newMessage.save();

    
      socket.to(roomId).emit('receive_message', newMessage); 

      console.log('Message saved:', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { success: false, error: 'Failed to save message' });
    }
  });
};

export const sendNotification=(socket:Socket)=>{
    socket.on('sendNotification',async(notification:{senderId:string,patientId:string,recieverId:string,message:string})=>{
      console.log("recievedNotification",notification)
    try{
        const{senderId,patientId,recieverId,message}=notification;

        const newNotification=new Notification({
         
             senderId,
           recieverId,
          patientId,
           message,
        })

        await newNotification.save();

        socket.to(recieverId).emit('recieveNotification',notification)
        
     console.log("notification saved to database")

    }
    catch(error){
        console.error('error saving notification to database',error)

    }


    })
 
}