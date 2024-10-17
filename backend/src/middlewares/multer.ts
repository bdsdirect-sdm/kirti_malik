import multer from "multer";
import path from "path";
import fs from 'fs';
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
export const uploadMiddleware = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]);
  