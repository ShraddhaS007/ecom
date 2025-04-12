
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import "./Login.css"; 

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle Forgot Password UI
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

  // Login & Signup State
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });

  // Forgot Password State
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP & New Password

  // Handle login form changes
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignUpChange = (e) => setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  // Login API Call
  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with:", loginData);
    toast.info("Login form submitted");
  
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, loginData);
      console.log("Login response:", response);
  
      if (response.data.success) {
        toast.success("Logged in successfully!");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Login failed:", err.response || err);
      toast.error("Login failed! Please try again.");
    }
  };
  

  // Signup API Call
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, signUpData);
      if (response.data.success) {
        toast.success("Signed up successfully!");
        setToken(response.data.token);
       //sessionStorage.setItem("token", response.data.token);
         localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Signup failed! Please try again.");
    }
  };

  // Forgot Password: Step 1 - Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setStep(2); // Move to OTP verification step
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Failed to send OTP. Try again!");
    }
  };

  // Forgot Password: Step 2 - Verify OTP & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, { email, otp, newPassword });
      if (response.data.success) {
        toast.success("Password reset successfully!");
        setIsForgotPassword(false); // Back to login page
        setStep(1);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Failed to reset password. Try again!");
    }
  };

  // useEffect(() => {
    
  //    const storedToken = localStorage.getItem("token");
  // if (storedToken) {
  //   setToken(storedToken);
  //   navigate("/");
  // }
  // }, [token]);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
      navigate("/");
    }
  }, []);
  
  return (
    <div className="login-container">
      <h2>{isForgotPassword ? "Forgot Password" : isSignUp ? "Sign Up" : "Login"}</h2>

      {/* Forgot Password Form */}
      {isForgotPassword ? (
        <div>
          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
              <button type="submit" className="auth-btn">Send OTP</button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <label>Enter OTP</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
              <label>New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" required />
              <button type="submit" className="auth-btn">Reset Password</button>
            </form>
          )}
          <p>
            <span className="toggle" onClick={() => setIsForgotPassword(false)}>Back to Login</span>
          </p>
        </div>
      ) : isSignUp ? (
        <form onSubmit={handleSignUpSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={signUpData.name} onChange={handleSignUpChange} placeholder="Enter your name" required />
          <label>Email</label>
          <input type="email" name="email" value={signUpData.email} onChange={handleSignUpChange} placeholder="Enter your email" required />
          <label>Password</label>
          <input type="password" name="password" value={signUpData.password} onChange={handleSignUpChange} placeholder="Enter your password" required />
          <button type="submit" className="auth-btn">Sign Up</button>
          <p>Already have an account? <span className="toggle" onClick={() => setIsSignUp(false)}>Login here</span></p>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Enter your email" required />
          <label>Password</label>
          <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password" required />
          <button type="submit" className="auth-btn">Login</button>
          <p><span className="toggle" onClick={() => setIsForgotPassword(true)}>Forgot Password?</span></p>
          <p>Don't have an account? <span className="toggle" onClick={() => setIsSignUp(true)}>Sign Up</span></p>
        </form>
      )}
    </div>
  );
};

export default Login;
