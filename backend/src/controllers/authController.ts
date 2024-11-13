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


export const addPatient = async (req:any, res:any) => {
    const { dob, email, phoneNumber, firstName, lastName, gender, diseaseName, laterality, returnPatient, MDdoctor,DoctorId } = req.body;

    
    if (!req.file) {
        return res.status(400).json({ message: 'Medical documents are required' });
    }

    const MedicalDocuments = req.file.path; 
    

    try {
        const newPatient = await ReferralPatient.create({
            dob,
            email,
            phoneNumber,
            firstName,
            lastName,
            gender,
            diseaseName,
            laterality,
            returnPatient,
            MDdoctor,
            MedicalDocuments,
            status: 'placed',
            DoctorId
        });

        res.status(201).json({ message: 'Patient added successfully', newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Add patient failed', error});
    }
};


//to get the data on dashboard 

export const getODDashboardData = async (req: Request, res: Response) => {
  try {
 
    const referralsPlaced = await ReferralPatient.count({ where: { status: 'placed' } });
    const referralsCompleted = await ReferralPatient.count({ where: { status: 'completed' } });
    const mdCount = await Doctor.count({ where: { userType: 'MD' } });

    res.status(200).json({ referralsPlaced, referralsCompleted, mdCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve dashboard data' });
  }
};

//to get the MD dashboard data

export const getMDdashboard=async(req:Request,res:Response)=>{
    try{
       
        
            const referralsRecieved=await ReferralPatient.count({where:{status:'placed'}});
           const referralsCompleted=await ReferralPatient.count({where:{status:'completed'}});
            const totalDoctor=await Doctor.count();

            res.status(500).json({referralsRecieved,referralsCompleted,totalDoctor})

    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'failed to recieve dashboard data'})
    }


}

//to get the names of MD doctor on form

export const getMDdoctor=async(req:any,res:any)=>{
    try{
        const doctor=await Doctor.findAll({
            where:{userType:'MD'}
        })
        return res.status(200).json(doctor)

    }
    catch(error){
        return res.status(500).json({message:'server error',error})

    }
}

//to fetch the list of referred patients on dashboard

export const referralPatientList=async(req:any,res:any)=>{
    try{
        const patient=await ReferralPatient.findAll();
        console.log("list====",patient)
        return res.status(201).json(patient)
        

    }
    catch(error)
    {
        return res.status(400).json({message:'server errorr',error})
    }
}

//to fetch the patient according to the doctor selected

export const getPatientbyDoctor=async(req:any,res:any)=>{
    try{
        
        const patients=await ReferralPatient.findAll({where:{DoctorId:req.params.DoctorId}});
        return res.status(200).json(patients);

    }catch(error)
    {
        return res.status(500).json({message:"server error",error})
    }
   }