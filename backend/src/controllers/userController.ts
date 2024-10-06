import { Request, Response } from 'express';
import User from '../models/user';
import Address from '../models/address';
// import upload from '../middleware/fileUploader';
import cloudinary from '../middleware/cloudinaryConfig';



export const addUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      companyAddress,
      companyState,
      companyCity,
      companyZip,
      homeAddress,
      homeState,
      homeCity,
      homeZip
    } = req.body;

    // Upload profile photo to Cloudinary
    const profilePhotoUrl = req.file ? (await cloudinary.uploader.upload(req.file.path)).secure_url : '';

    const user = await User.create({
      firstName,
      lastName,
      email,
      profilePhoto: profilePhotoUrl,
    });

    await Address.create({
      userId: user.id,
      companyAddress,
      companyState,
      companyCity,
      companyZip,
      homeAddress,
      homeState,
      homeCity,
      homeZip
    });

    const userWithAddress = await User.findOne({
      where: { id: user.id },
      include: [{ model: Address, as: 'address' }],
    });

    res.status(201).json({ message: 'User registered successfully', user: userWithAddress });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



//controller to view profile 

export const Profile = async (req: Request, res: Response) => {
  try {
    console.log('profile is woprking here')
    const userId = req.params.id;

  
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Address,
          as: 'address', // Alias if used, ensure it's consistent with your model
          required: false,
        },
      ],
    });
    console.log(user,"this is address coming from databse" ); // Check if this logs the correct address
    


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


export const updateProfile = async (req: Request, res: Response) => {
  try {
   
    const {
      firstName,
      lastName,
      email,
      companyAddress,
      companyState,
      companyCity,
      companyZip,
      homeAddress,
      homeState,
      homeCity,
      homeZip
    } = req.body;

    // Fetch the user by ID
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Address, as: 'address' }] // Including the address with the alias
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    // Update profile photo if a new one is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.profilePhoto = result.secure_url; // Get the Cloudinary URL
    }

    // Update address details
    if (user.address) {
      user.address.companyAddress = companyAddress || user.address.companyAddress;
      user.address.companyState = companyState || user.address.companyState;
      user.address.companyCity = companyCity || user.address.companyCity;
      user.address.companyZip = companyZip || user.address.companyZip;
      user.address.homeAddress = homeAddress || user.address.homeAddress;
      user.address.homeState = homeState || user.address.homeState;
      user.address.homeCity = homeCity || user.address.homeCity;
      user.address.homeZip = homeZip || user.address.homeZip;

      // Save address
      await user.address.save();
    }

    // Save updated user details
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};




//controller for user login 


// export const loginUser = async (req: Request, res: Response) => {
//   try {
      
//       const { email, password } = req.body ;

//       const user = await User.findOne({ where: { email } })
//       if (!user || !(await bcrypt.compare(password,user.password))) {
//           return res.status(401).json({ message: 'Invalid credentials' });
//       }
     
//       const token = jwt.sign({ userId: user.id ,email: user.email}, 'kirti', {
//           expiresIn: '1h', 
//       });
//       res.status(200).json({token})
//   } catch (error) {
//       console.error('error during login',error);
//       return res.status(500).json({ message: 'Server error' });
//   }

// };



//controller to update profile 

// export const updateProfile = async (req: Request, res: Response) => {
//   console.log("Updating profile...");
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//       const decoded: any = jwt.verify(token, 'kirti');
//       if (!decoded.userId) {
//           return res.status(401).json({ message: 'Invalid token payload' });
//       }

//       const { first_name,last_name, email,gender, dob, phoneNumber } = req.body;

//       const user = await User.findOne({ where: { id: decoded.userId } });
//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }
//       user.first_name=first_name?? user.first_name;
//       user.last_name=last_name?? user.last_name;
//       user.email=email?? user.email;
//       user.gender = gender ?? user.gender;
//       user.dob = dob ?? user.dob;
//       user.phoneNumber = phoneNumber ?? user.phoneNumber; 

//       await user.save();

//       return res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (err) {
//       console.error('Error updating profile:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// };


