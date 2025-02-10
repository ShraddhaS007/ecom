import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";


const createToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET)
}


const loginUser= async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await userModel.findOne({email});
        if(!user){
          return res.json({success:false, message:"User does not exists"})
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(isMatch){
           const token=createToken(user._id)
           res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
      res.json({success:false,message:error.message})
    }

}

const registerUser= async(req,res)=>{
   try {
      const {name,email,password}=req.body;

      const exits= await userModel.findOne({email});
      if(exits){
        return res.json({success:false, message:"User already exists"})
      }

      if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter a valid mail"})
      }
      if(password.length<8){
        return res.json({success:false, message:"Password must be atleast of 8 characters"})
      }

      //hashingg
      const salt =await bcrypt.genSalt(10)
      const hashedPassword =await bcrypt.hash(password,salt)

      const newUser =new userModel({
        name,
        email,
        password:hashedPassword
      })

      const user=await newUser.save()

      const token=createToken(user._id)
      res.json({success:true,token})

   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
   }
}

const adminLogin= async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
      res.json({success:false,message:error.message})
    }

}

const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    
    if (!user) return res.json({ success: false, message: "User not found" });

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP to the database with expiry (5 min)
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error sending OTP" });
  }
};

const verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.json({ success: false, message: "User not found" });

    // Check if OTP is correct and not expired
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error resetting password" });
  }
};

export {loginUser,registerUser,adminLogin, sendResetOTP, verifyOTPAndResetPassword }