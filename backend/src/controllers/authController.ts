import { Request,Response } from "express";
import User from "../models/user";
import { sentRegistrationEmail } from "../config/mailer";

export const registerUser=async(req:Request,res:any)=>{
    const{name,email,password}=req.body;
   
    try{

        const existingUser=await User.findOne({where: { email }});
        if(existingUser)
        {
            return res.status(400).json({message:'user already exists with that email'})
        }

        const user=await User.create({
            name,email,password
        });
        await sentRegistrationEmail(user.email,user.name);
        res.status(201).json({message:'User registered',user})

    }catch(error){

        res.status(201).json({message:'someting went wrong',error})
    }

}

export const getUser=async(req:Request,res:any)=>{
    try{

    }
    catch{
        
    }

}