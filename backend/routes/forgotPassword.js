const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js"); // User model
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");


let otpStorage = {}; // Temporary storage for OTPs

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found!" });
  }

  // Generate OTP (6-digit)
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStorage[email] = otp; // Store OTP temporarily

  // Configure email transporter (use your email service)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: "Failed to send email!" });
    }
    res.json({ success: true, message: "OTP sent successfully!" });
  });
});



router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Check if OTP matches
  if (otpStorage[email] !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP!" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashedPassword });

  // Remove OTP after successful reset
  delete otpStorage[email];

  res.json({ success: true, message: "Password updated successfully!" });
});

export default router;
