import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAgencies, loginUser, registerUser } from '../controllers/authController';
import { RegisterValidator } from '../middlewares/validator';

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
    cb(null, Date.now() + '-' + file.originalname); 
  },
});


const fileFilter = (req:any, file:any, cb:any) => {
  if (file.fieldname === 'profileImage') {
   
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Profile image must be in JPEG or JPG format'), false);
    }
  } else if (file.fieldname === 'resume') {
    
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Resume must be in PDF or DOC format'), false);
    }
  } else {
    cb(new Error('Invalid file field'), false);
  }
};

const upload = multer({ storage, fileFilter });


router.post('/register', upload.fields([{ name: 'profileImage' }, { name: 'resume' }]),RegisterValidator, registerUser);
router.post('/login', loginUser);
router.get('/agencies', getAgencies);

export default router;
