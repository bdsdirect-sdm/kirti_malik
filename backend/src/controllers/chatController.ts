import Message from "../models/message.model";
import { Request,Response } from "express";
import { Server } from "socket.io";


export const getMessages=async(req:Request,res:Response)=>{

    const{senderId,recieverId}=req.params;
    console.log("seeeeeeeeeeee",senderId)
    try{
        console.log("get messages              ======================")
        const message=await Message.findAll({
            where:{
                senderId,
                recieverId
            },
            order:[['timestamp','ASC']]
        }) ;
        res.json(message)
       
    }catch(error){
        res.status(500).json({message:'server error'})

    }
}



export const sendMessage = async (req: Request, res: Response) => {
    const { senderId, recieverId, messageContent } = req.body;

    
    try {
        const message = await Message.create({
            senderId,
            recieverId,
            messageContent,
        });
        res.json(message);
    } catch (error) {
        console.error('Error creating message:', error); 
        res.status(500).json({ message: 'Server Error' });
    }
};

