import express from "express";
import loginUser from "../controllers/userLoginController";

const loginRouter=express.Router();
loginRouter.post('/login',loginUser);
export default loginRouter;