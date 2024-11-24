import { Request,Response } from "express";
import Doctor from "../models/doctor.model";
import ReferralPatient from "../models/referralPatient.model"
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import { sendWelcomeEmail } from "../config/mailer";
import Appointments from "../models/appointment.model";
import { Op, Sequelize } from "sequelize";
import { Where } from "sequelize/types/utils";
import Message from "../models/message.model";


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
    const { dob, email, phoneNumber, firstName, lastName, gender, diseaseName, laterality, returnPatient, MDdoctor } = req.body;
    const ReferredTo=MDdoctor;
    const ReferredBy=req.params.DoctorId;
   
    
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
            MedicalDocuments,
            status: 'pending',
            ReferredTo,
            ReferredBy,
            MDdoctor
        });

        console.log("======",req.body)
        res.status(201).json({ message: 'Patient added successfully', newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Add patient failed', error});
    }
};


//to get the data on dashboard 

export const getODDashboardData = async (req: Request, res: Response) => {
  try {
 
    const referralsPlaced = await ReferralPatient.count({ where: { status: 'pending' } });
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
       
           const DoctorId=req.params.DoctorId;
        
            const referralsRecieved=await ReferralPatient.count({where:{referredTo:DoctorId}});
           const referralsCompleted=await ReferralPatient.count({where:{referredTo:DoctorId,status:'completed'}});
            const totalDoctor=await Doctor.count();
            //console.log("recieved====",referralsRecieved)

            res.status(200).json({referralsRecieved,referralsCompleted,totalDoctor})

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

export const referralPatientList = async (req: any, res: any) => {
  try {
    const patients = await ReferralPatient.findAll({
      include: [
        {
          model: Doctor,
          attributes: ['firstName', 'lastName'], 
        },
        {
          model:Appointments,
          attributes:['appointmentDate','appointmentType']
        }
     
      ],
    });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referral patients' });
  }
};


//to get patient on MD dashboard

export const getPatientbyDoctor = async (req: any, res: any) => {
    try {
        const patients = await ReferralPatient.findAll({
            where: {[Op.or]:[
              {ReferredTo: req.params.DoctorId},
              {ReferredBy:req.params.DoctorId}

            ]  },
            include: [
                {
                    model: Appointments,  
                    where: { patientId: Sequelize.col('ReferralPatient.id') }, 
                    attributes:['appointmentDate','appointmentType'],
                    required: false, 
                },
                {
                  model:Doctor,
                  attributes:['firstName','lastName']
                }
            ]
        });

        console.log("======", patients);
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: "server error", error });
    }
};



   //to create an appointment for the patient


export const addAppointment = async (req: any, res: any) => {
  
  const { patientId, appointmentDate, appointmentType, } = req.body;

  try {
  
    const patient = await ReferralPatient.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

  const doctor=req.params.DoctorId;
    const appointment = await Appointments.create({
      patientId, 
      appointmentDate, 
      appointmentType, 
      doctor
      
    });

    
    return res.status(201).json({
      message: "Appointment added successfully",
      appointment,
    });

  } catch (error) {
    console.error("Error adding appointment:", error);
    return res.status(500).json({
      message: "Error adding appointment",
      error,
    });
  }
};

//to get all appointments on appointment page



export const getAllAppointments = async (req: any, res: any) => {
  try {
   
    const appointments = await Appointments.findAll({
        where:{doctor:req.params.DoctorId},
      include: {
        model: ReferralPatient, 
        attributes: ['firstName', 'lastName', 'email','status' ], 
      },
    });
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found.' });
    }

    
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({
      message: 'Error fetching appointments',
      error,
    });
  }
};

// to view the appointment of particular patient on md dashboard

export const getAppointmentsByPatient = async (req: any, res: any) => {
  try {
    const patientId  = req.params.PatientId;

   
    const appointments = await Appointments.findAll({
      where: { patientId },
      include: {
        model: ReferralPatient,
        attributes: ['firstName', 'lastName', 'email'],
      },
    });

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this patient.' });
    }

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments for patient:', error);
    return res.status(500).json({
      message: 'Error fetching appointments for patient',
      error,
    });
  }
};

//to view the info of particular patient

export const viewPatient=async(req:any,res:any)=>{
  try{
    const patientId=req.params.patientId

    const patientInfo= await ReferralPatient.findOne(
      {
        where:{id:patientId},
        include:[
          {
            model:Doctor
          },
          {
            model:Appointments
          }
        ]
      }
    )
       return res.status(200).json({ patientInfo });
  }
  catch{
       return res.status(500).json({message:'error viewing the patient'})
  }
}

//to edit the Patient

export const editPatient = async (req: any, res: any) => {
  
  try {
    const patientId = req.params.patientId;
    const {
      dob,
      email,
      phoneNumber,
      firstName,
      lastName,
      gender,
      diseaseName,
      laterality,
      returnPatient,
      referredTo,
    } = req.body;

   

    const patient = await ReferralPatient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

   
    patient.dob = dob;
    patient.email = email;
    patient.phoneNumber = phoneNumber;
    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.gender = gender;
    patient.diseaseName = diseaseName;
    patient.laterality = laterality;
    patient.returnPatient = returnPatient;
    patient.ReferredTo = referredTo;

   
    if (req.file) {
      patient.MedicalDocuments = req.file.path; 
    }

   
    await patient.save();

    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export const sendMessage=async(req:any,res:any)=>{

  const { patientId, senderId, receiverId, message,roomId } = req.body;
  try {
    
    const chat = await Message.create({ patientId, senderId, receiverId, message,roomId });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Error saving message' });
  }

}