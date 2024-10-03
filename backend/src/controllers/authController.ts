
import { Request, Response } from 'express';

export const uploadSingle = (req: Request, res: Response): any => {
    console.log(req.file);
    return res.status(200).send({message: "Single file uploaded", data: req.file});
};

export const uploadMultiple = (req: Request, res: Response): any => {
    console.log(req.files);
    return res.status(200).send("Multiple files uploaded");
};
