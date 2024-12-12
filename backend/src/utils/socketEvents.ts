import { Socket ,Server} from 'socket.io';
import Message from '../models/message.model';
import Notification from '../models/notification.model';
import setupSocket from './setupSocket';



export const sendMessage = (socket: Socket, io: Server) => {
  socket.on('sendMessage', async (messageData: { patientId: string, senderId: string, recieverId: string, message: string, roomId: string }) => {
    console.log('Received message data:', messageData);  

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

      console.log('Message saved:', newMessage);

    
      io.to(roomId).emit('receiveMessage', newMessage);
      console.log(`Message emitted to room ${roomId}`);

    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { success: false, error: 'Failed to save message' });
    }
  });

     

};


export const sendNotification=(socket:Socket,io:Server)=>{
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

        io.to(recieverId).emit('recieveNotification',newNotification)       
     console.log(`message emitted to reciver with id  ${recieverId}`)
    }
   
    catch(error){
        console.error('error saving notification to database',error)

    }
    })
 
}