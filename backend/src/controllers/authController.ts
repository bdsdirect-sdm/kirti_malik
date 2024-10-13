import { Request,Response } from "express";
import User from "../models/user.model"
import { sendWelcomeEmail } from "../config/mailer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";



export const registerUser = async (req: any, res: any) => {
    console.log('hello');
    try {
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 10);
        
       
        const user = {        
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            userType: req.body.userType,
            hobbies: req.body.hobbies,
            profileImage: req.files['profileImage'][0].path,
            resume: req.body.userType === 'job seeker' ? req.files['resume'][0].path : null,
            agencyId:req.body.userType==='job seeker' ? req.body.agency:null,
            password: hashedPassword,
        };
        
        console.log('Received files:', req.files);
        console.log('Body:', req.body);

       
        const newUser = await User.create(user);
        console.log("newUser==", newUser);

        
        if (newUser.userType === 'job agency') {
            newUser.agencyId = newUser.id;
            await newUser.save(); 
        }

        await sendWelcomeEmail(newUser.email, password);
        return res.status(201).json({ message: "User added successfully", user: newUser });

    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ message: "Server error", error });
    }
};



  export const loginUser = async (req: Request, res: any) => {
    try {
        console.log('hello')
        const { email, password } = req.body ;
      

        const user = await User.findOne({ where: { email } })
        if (!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
       
        const token = jwt.sign({ userId: user.id ,email: user.email}, 'kirti', {
            expiresIn: '1h', 
        });
          
        let associatedJobSeekers=null;
        let agencyDetails=null;

        if(user.userType==='job agency'){
            associatedJobSeekers=await User.findAll({
                where:{
                    agencyId:user.id,
                    userType:'job seeker',
                },

            });
        }else if(user.userType==='job seeker'){
            agencyDetails=await User.findOne({
                where:{id:user.agencyId},
            });

        }
        res.status(200).json({token, associatedJobSeekers,agencyDetails});

        
    } catch (error) {
        console.error('error during login',error);
        return res.status(500).json({ message: 'Server error' });
    }

};

   
export const getAgencies = async (req: Request, res:any) => {
    try {
        const agencies = await User.findAll({
            where: { userType: 'job agency' }, 
        });

        return res.status(200).json(agencies);
    } catch (error) {
        console.error('Error fetching agencies:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};


