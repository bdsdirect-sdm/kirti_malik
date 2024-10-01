
import express from 'express';
import updateProfile from '../controllers/updateController';

const updateRouter = express.Router();

updateRouter.put('/update', updateProfile);

export default updateRouter;
