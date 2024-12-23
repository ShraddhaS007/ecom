import axios from 'axios'
import React, { useState } from 'react';
import './Login.css';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitHandler=async(e)=>{
      try {
        e.preventDefault();
        const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
        if( response.data.success){
           setToken(response.data.token)
        }else{
            toast.error(response.data.message)
        }
        

      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-heading">Admin Panel</h1>
        <form className="login-form" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <p className="form-label">Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="your@email.com"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <p className="form-label">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Enter your Password"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
