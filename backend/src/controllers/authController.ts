import { Request,Response } from "express";
import Doctor from "../models/doctor.model";
import ReferralPatient from "../models/referralPatient.model"
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import { sendWelcomeEmail } from "../config/mailer";


//to regsiter the doctor as OD or MD
export const registerDoctor=async(req:any,res:any)=>
{

    const{firstName,lastName,email,userType,password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10)
    try{
      
        const newDoctor=await Doctor.create({
            firstName,
            lastName,
            email,
            userType,
            password:hashedPassword,
            isVerified:false
        });
          
        const otp=Math.floor(100000+Math.random()*900000);
        const otpExpiration=new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes()+10);

        newDoctor.otp=otp.toString();
        newDoctor.otpExpiration=otpExpiration;

        await newDoctor.save();

        await sendWelcomeEmail(newDoctor.email,otp.toString());
      
        res.status(201).json({message:'OTP sent to mail. Please verify it for complete registration',email:newDoctor.email});  

    }
    catch(error){
        res.status(500).json({message:'registration failed',error})

    }

}


//to login the doctor
export const loginDoctor=async(req:any, res:any)=>{

    try{

        const{email,password}=req.body;

    const doctor=await Doctor.findOne({where:{email}})

    if(!doctor || !(await bcrypt.compare(password,doctor.password)))
    {
        return res.status(401).json({message:'invalid credentials'});
    }

      const token=jwt.sign(
            {
                id:doctor.id, email:doctor.email
            },
            'secretkey',
            {expiresIn:'1h'}
        )

        const response={token,doctor};

        res.status(200).json(response)

    }

    catch(error)
    {
        console.error('error during login', error)
        return res.status(500).json({message:'server error'})
    }
    
}

//to verify the OTP

export const verifyOtp=async(req:any,res:any)=>{
    const{email,otp}=req.body;
    try{
        const doctor=await Doctor.findOne({where:{email}});
        console.log("doctor backend=====",doctor)

        if(!doctor)
        {
            return res.status(404).json({message:'user not found'})
        }

        if(doctor.otp!==otp)
        {
            return res.status(400).json({message:'invalid otp'})
        }

        doctor.isVerified=true;
        doctor.otp=null;
         await doctor.save();

         res.status(200).json({message:'user successfully verified'});


    }
    catch(error){

        res.status(500).json({message:"otp verification failed",error})

    }
}

//to add patient on OD dashboard

export const addPatient=async(req:any,res:any)=>{
    const{dob,email,phoneNumber,firstName,lastName,gender,diseaseName,laterality,returnPatient,MDdoctor}=req.body

    try{
        const newPatient=await ReferralPatient.create({
            dob,email,phoneNumber,firstName,lastName,gender,diseaseName,laterality,returnPatient,MDdoctor
        })
        res.status(201).json({message:'patient added successfully',newPatient})

    }catch(error){

        res.status(500).json({message:'add patient failed',error})

    }
}