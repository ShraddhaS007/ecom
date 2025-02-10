import express from "express";
import { loginUser,registerUser,adminLogin , sendResetOTP,verifyOTPAndResetPassword} from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post("/forgot-password", sendResetOTP)
userRouter.post("/reset-password", verifyOTPAndResetPassword)

export default  userRouter;