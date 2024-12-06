import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import { sendWelcomeEmail } from "../config/mailer";
import { Op, Sequelize, where } from "sequelize";
import { parse } from "json2csv";
import PDFDocument from 'pdfkit'; 
import Joi from "joi";

import Doctor from "../models/doctor.model";
import ReferralPatient from "../models/referralPatient.model"
import Appointments from "../models/appointment.model";
import Notification from "../models/notification.model";
import Message from "../models/message.model";
import Staff from "../models/staff.model";
import DoctorAddress from "../models/address.model";


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

//to add the address of the doctor

export const doctorAddress=async(req:any,res:any)=>{
  try{
    const doctorId=req.params.doctorId;
       const{address,country,state, city,pincode}=req.body;

       const doctorAddress=await DoctorAddress.create({
        doctorId,address,country,state,city,pincode
       })

       res.status(201).json({message:'address added successfully',doctorAddress})
  }
  catch(error){
       res.status(500).json({message:'add address failed',error})
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
      doctor,
      status:'pending'
      
    });

     await patient.update({status:'scheduled'})
     await appointment.update({status:'scheduled'})
    
    return res.status(201).json({
      message: "Appointment added successfully and patient staus updated successfully",
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

   const patientId  = req.params.PatientId;
   //console.log("000000000000",patientId)
  try {
   
    const appointments = await Appointments.findOne({
      where: { id:patientId },
      include: {
        model: ReferralPatient,
        attributes: ['firstName', 'lastName', 'email'],
      },
    });

  
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

//to edit the appointment

export const editAppointment=async(req:any,res:any)=>{
  const patientId=req.params.PatientId;
  console.log("pppppp",patientId)

  try{
    const {  appointmentDate, appointmentType, } = req.body;

    const appointment=await Appointments.findByPk(patientId)
    if(!appointment){
      return res.status(404).json({message:'appointment not found'})
    }
    
    appointment.appointmentDate=appointmentDate,
    appointment.appointmentType=appointmentType,

    await appointment.save();

    return res.status(200).json({message:'appointment updated successfully'})

  }
  catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

//cancel the appointment

export const cancelAppointment=async(req:any,res:any)=>{
  const appointmentId=req.params.id;
  try{
    const appointment=await Appointments.findByPk(appointmentId)
      if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const patient=await ReferralPatient.findByPk(appointment.patientId)
    if(patient)
    {
      await patient.update({status:'cancelled'})
    }
 

    return res.status(200).json({
      message:'appointment cancelled successfully'
    })

  }
  catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({
      message: "Error cancelling appointment",
      error,
    });
  }
}

//to complete the appointment


export const completeAppointment=async(req:any,res:any)=>{
  const appointmentId=req.params.id;
  try{
    const appointment=await Appointments.findByPk(appointmentId)
      if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const patient=await ReferralPatient.findByPk(appointment.patientId)
    if(patient)
    {
      await patient.update({status:'completed'})
    }
 

    return res.status(200).json({
      message:'appointment completed successfully'
    })

  }
  catch (error) {
    console.error("Error completing appointment:", error);
    return res.status(500).json({
      message: "Error completing appointment",
      error,
    });
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


export const getChatHistory=async(req:any,res:any)=>{
  const  roomId  = req.params.roomId; 
  console.log(roomId);
  try{
    const messages=await Message.findAll({
      where:{
        roomId:roomId
      }
    })
    return res.status(200).json(messages)
  }
  catch(error)
  {
    console.error('error fetching chat history',error)
    return res.status(500).json({error:"an error occured while fetching chat"})
  }
}

export const getNotification=async(req:any,res:any)=>{
 
  try{
       const DoctorId=req.params.DoctorId;
       console.log("yeeeee",DoctorId)
  const notificaion =await Notification.findAll({
    where:{
      recieverId:DoctorId
    }

  })
  return res.status(200).json(notificaion)
  
  }
  catch(error){
    console.error('error fetching notification',error)
    return res.status(500).json({error:"an error occured while fetching patient "})

  }
 
}

// to add the staff

export const addStaff=async(req:any,res:any)=>{

  const{firstName,lastName,gender,email,phoneNumber,}=req.body
  const doctorId=req.params.DoctorId;
  //console.log("holaaaaa",doctorId)
  try{
    
   const staff=await Staff.create({
    firstName,lastName,email,gender,phoneNumber,doctorId
   })

     return res.status(201).json({
      message: "staff added successfully",
      staff,
    });
  }
  catch(error){
     console.error("Error adding staff:", error);
    return res.status(500).json({
      message: "Error adding staff",
      error,
    });

  }
}

//to get staff list

export const getStaff=async(req:any,res:any)=>{
  const doctorId=req.params.DoctorId;
  try{
    const staffList=await Staff.findAll(
      {where:{
        doctorId:doctorId
      }}
    )
    return res.status(200).json(staffList)
  }
  catch(error){
     console.error("Error fetching staff:", error);
    return res.status(500).json({
      message: "Error fetching staff",
      error,
    });

  }
}

//to get the profile of doctor

export const getDoctor=async(req:any,res:any)=>{
  const doctorId=req.params.DoctorId;
 // console.log("huhhhihihihhihuhi",doctorId)
  try{
    const doctor=await Doctor.findOne({
      where:{
        id:doctorId
      },
    include:[{
      model:DoctorAddress
    }]
    });
    return res.status(200).json(doctor)
  }
  catch(error){
     console.error("Error fetching doctor:", error);
    return res.status(500).json({
      message: "Error fetching doctor",
      error,
    });

  }

}

//to generate a csv file

export const generateCSV=async(req:any,res:any)=>{
  try{
        const patients=await ReferralPatient.findAll();
        const plainPatients=patients.map((patient:any)=>patient.toJSON());
        const csv=parse(plainPatients);
        res.header('content-type','text/csv');
        res.attachment('patient_info.csv');
        res.send(csv);
  }
  catch(error){
    console.error('error generating csv',error);
    res.status(500).json({message:'error generating csv',error})

  }
}

//to generate a pdf file

export const generatePDF = async (req: any, res: any) => {
  try {
    const patientId = req.params.patientId;

    const patients = await ReferralPatient.findOne({
      where: { id: patientId },
      include: [
        {
          model: Doctor,
        },
        {
          model: Appointments,
        },
      ],
    });

    
    if (!patients) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const plainPatients = patients.toJSON();
    const doc = new PDFDocument();

    res.header('content-type', 'application/pdf');
    res.attachment('patient_info.pdf');
    doc.pipe(res);


    doc.font('Helvetica-Bold').fontSize(12).text('Basic Information', { align: 'left' });
    doc.font('Helvetica').fontSize(10);
    doc.text(`Name: ${plainPatients.firstName} ${plainPatients.lastName}`, { align: 'left' });
    doc.text(`DOB: ${plainPatients.dob}`, { align: 'left' });
    doc.text(`Phone: ${plainPatients.phoneNumber}`, { align: 'left' });
    doc.text(`Email: ${plainPatients.email}`, { align: 'left' });
    doc.text(`Gender: ${plainPatients.gender}`, { align: 'left' });

    doc.moveDown();

   
    doc.font('Helvetica-Bold').fontSize(12).text('Reason of Consult', { align: 'left' });
    doc.font('Helvetica').fontSize(10);
    doc.text(`Reason: ${plainPatients.diseaseName}`, { align: 'left' });
    doc.text(`Laterality: ${plainPatients.laterality}`, { align: 'left' });
    doc.text(`Patient will return: ${plainPatients.returnPatient}`, { align: 'left' });

    doc.moveDown();


    doc.font('Helvetica-Bold').fontSize(12).text('Referral To', { align: 'left' });
    doc.font('Helvetica').fontSize(10);
    doc.text(`Doctor Name: ${plainPatients.Doctor?.firstName} ${plainPatients.Doctor?.lastName}`, { align: 'left' });
    doc.text(`Location: ${plainPatients.Doctor?.location || 'Not available'}`, { align: 'left' });

    doc.moveDown();


    doc.font('Helvetica-Bold').fontSize(12).text('Appointment History', { align: 'left' });

  
    doc.font('Helvetica-Bold').fontSize(10);
    doc.text('Type', { align: 'left', continued: true });
    doc.text('Date', { align: 'center', continued: true });
    doc.text('Status', { align: 'right' });

   
    doc.font('Helvetica').fontSize(10);
    if (plainPatients.Appointments && plainPatients.Appointments.length > 0) {
      plainPatients.Appointments.forEach((appointment: any, index: number) => {
        doc.text(appointment.appointmentType, { align: 'left', continued: true });
        doc.text(appointment.appointmentDate, { align: 'center', continued: true });
        doc.text(appointment.status || 'N/A', { align: 'right' });
      });
    } else {
      doc.text('No appointments available', { align: 'left' });
    }

    doc.end();
  } catch (error) {
    console.error('Error generating PDF');
    res.status(500).json({ message: 'PDF not downloaded', error });
  }
};
