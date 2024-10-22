import { Server } from "socket.io";

export const  setupSocketEvents=(io:Server)=>{
    io.on('connect', (socket) => {
      console.log('=====A user connected========');

        socket.on('sendMessage', async ({senderId,recieverId, messageContent})=>{
         console.log("===========message sent")

         io.emit('receiveMessage', {
                senderId,
                messageContent,
                recieverId
            });

        })
      
       
        socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});
}