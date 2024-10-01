
import { Router } from 'express';
import multer from 'multer';
import { uploadSingle, uploadMultiple } from '../controllers/authController';
import fs from 'fs';
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = "src/uploads/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadStorage = multer({ storage: storage });

router.post("/upload/single", uploadStorage.single("kirti"), uploadSingle);

router.post("/upload/multiple", uploadStorage.array("kirti", 10), uploadMultiple);

export default router;
