

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";  // Import toast
import "react-toastify/dist/ReactToastify.css";  // Import Toast styles
import "./Login.css"; // Styling for the login form

// Initialize toast co
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate(); // Access backendUrl and setToken

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle login form changes
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle sign-up form changes
  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, loginData);
      if (response.data.success) {
        // Save token and notify user
        setToken(response.data.token); // Save token (or other details) in context
        toast.success("Logged in successfully!"); // Show success toast
        console.log("Logged in successfully", response.data);
        navigate("/");
        // Redirect user or show a success message
      } else {
        toast.error(response.data.message); // Show error toast
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      toast.error("Login failed! Please try again."); // Show error toast on exception
      console.error("Login error:", error.message);
    }
  };

  // Handle sign-up submit
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, signUpData);
      if (response.data.success) {
        toast.success("Signed up successfully! You can now log in."); // Show success toast
        console.log("Signed up successfully", response.data);
        navigate("/");
        setIsSignUp(false); // Switch to login form after successful sign-up
      } else {
        toast.error(response.data.message); // Show error toast
        console.error("Signup failed:", response.data.message);
      }
    } catch (error) {
      toast.error("Signup failed! Please try again."); // Show error toast on exception
      console.error("Signup error:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

      {isSignUp ? (
        <form onSubmit={handleSignUpSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={signUpData.name}
              onChange={handleSignUpChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
          <p>
            Already have an account?{" "}
            <span className="toggle" onClick={() => setIsSignUp(false)}>
              Login here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
          <p>
            <span className="toggle" onClick={() => alert("Forgot Password Clicked!")}>
              Forgot Password?
            </span>
          </p>
          <p>
            Don't have an account?{" "}
            <span className="toggle" onClick={() => setIsSignUp(true)}>
              Sign Up
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;

