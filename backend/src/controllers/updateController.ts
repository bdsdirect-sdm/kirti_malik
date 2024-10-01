import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const updateProfile = async (req: Request, res: Response) => {
    console.log("Updating profile...");
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded: any = jwt.verify(token, 'kirti');
        if (!decoded.userId) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        const { first_name,last_name, email,gender, dob, phoneNumber } = req.body;

        const user = await User.findOne({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.first_name=first_name?? user.first_name;
        user.last_name=last_name?? user.last_name;
        user.email=email?? user.email;
        user.gender = gender ?? user.gender;
        user.dob = dob ?? user.dob;
        user.phoneNumber = phoneNumber ?? user.phoneNumber; 

        await user.save();

        return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Error updating profile:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default updateProfile;
