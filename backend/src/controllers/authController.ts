import { Request,Response } from "express";
import User from "../models/user.model"
import { sendWelcomeEmail } from "../config/mailer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';



export const registerUser = async (req: any, res: any) => {
    console.log('hello');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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




export const loginUser = async (req: any, res: any) => {
    try {
        console.log('User login initiated');
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, 'kirti', {
            expiresIn: '1h',
        });

        const response = {
            token,
            user
        };

        console.log('user==========',response)

        res.status(200).json(response);

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const getJobSeekersForAgency = async (req: Request, res: Response) => {
    try {
        const { agencyId } = req.params;

        const jobSeekers = await User.findAll({ where: { agencyId , userType:'job seeker'} });

        res.status(200).json(jobSeekers);
    } catch (error) {
        console.error('Error fetching job seekers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getAgencyForJobseeker = async (req: any, res: any) => {
    try {
        const { id } = req.params;

      
        const jobSeeker = await User.findOne({
            where: { id, userType: 'job seeker' }, 
        });

        console.log('job=========',jobSeeker)

        if (!jobSeeker || !jobSeeker.agencyId) {
            return res.status(404).json({ message: 'Job seeker or associated agency not found' });
        }

        const jobAgency = await User.findOne({
            where: {
                id: jobSeeker.agencyId,
                userType: 'job agency',
            },
        });

        if (!jobAgency) {
           
            return res.status(404).json({ message: 'Associated job agency not found' });
        }

       
        res.status(200).json(jobAgency);
    } catch (error) {
        console.error('Error fetching job agency', error);
        res.status(500).json({ message: 'Server error' });
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



export const updateJobSeekerStatus = async (req: Request, res: any) => {
    

    try {
        const { userId, status } = req.body;

        
        if (!['pending', 'confirmed', 'declined'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        await User.update({ status }, { where: { id: userId } });

        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error('Error updating job seeker status', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


