import multer from "multer";
import path from 'path';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/uploads');
    },

    filename:(req,file,cb)=>{
        const fileExtension=path.extname(file.originalname);
        const filename=Date.now()+fileExtension;
        cb(null,filename)
    },
})

const upload=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const allowedTypes=["image/jpeg","image/png","image/jpg"];
        if(!allowedTypes.includes(file.mimetype))
        {
            return cb(new Error('file fomat not supported'));
        }
        cb(null,true)
    }
})

export default upload;