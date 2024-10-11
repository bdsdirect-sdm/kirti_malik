import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAgencies, getAgencyProfile, getJobSeekers, loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', 'uploads');


if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); 
  },
  filename: (req, file, cb) => {
    console.log("hereree",file)
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage });


router.post('/register', upload.fields([{ name: 'profileImage' }, { name: 'resume' }]), registerUser);
router.post('/login',loginUser)
router.get('/jobSeekers',getJobSeekers)
router.get('/agencies',getAgencies)
router.get('/agencyProfile',getAgencyProfile)

export default router;
