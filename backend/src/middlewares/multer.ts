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
   
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Profile image must be in JPEG or JPG format'), false);
    }
  } else if (file.fieldname === 'companyLogo') {
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('company logo must be in jpeg or png format'), false);
    }
  } 
  else if(file.fieldname==='image'){

   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('product must be in jpeg or png format'), false);
    }

  }
  else {
    cb(new Error('Invalid file field'), false);
  }
};

const upload = multer({ storage, fileFilter });
export const uploadMiddleware = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]);
  