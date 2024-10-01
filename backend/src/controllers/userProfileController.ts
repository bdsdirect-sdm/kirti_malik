import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user'; 

const Profile = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded: any = jwt.verify(token, 'kirti'); 
        const user = await User.findOne({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            dob:user.dob,
            gender:user.gender,
            phoneNumber:user.phoneNumber
        });
    } catch (err) {
        console.error('Error verifying token or querying user:', err);
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default Profile;
