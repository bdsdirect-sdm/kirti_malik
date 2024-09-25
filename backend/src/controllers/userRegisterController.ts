import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';

console.log('9');


const registerUser = async (req: Request, res: Response) => {
  console.log("hello")
  const { first_name, last_name, email, password, dob, phone, gender, confirmPassword, termsAndConditions } = req.body;
  console.log(req.body);

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      dob,
      phone,
      gender,
      password: hashedPassword,
      termsAndConditions,
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export default registerUser;