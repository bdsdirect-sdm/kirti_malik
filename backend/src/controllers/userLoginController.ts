import { Request, Response } from 'express';
import User from '../models/user'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
console.log('heee')

const loginUser = async (req: Request, res: Response) => {
    try {
        
        const { email, password } = req.body ;

        const user = await User.findOne({ where: { email } })
        if (!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
       
        const token = jwt.sign({ userId: user.id ,email: user.email}, 'kirti', {
            expiresIn: '1h', 
        });
        res.status(200).json({token})
    } catch (error) {
        console.error('error during login',error);
        return res.status(500).json({ message: 'Server error' });
    }

};

export default loginUser;
