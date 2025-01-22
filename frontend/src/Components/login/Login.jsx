
import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import route from '../route';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './login.scss';
const Login = () => {
  const notify = (message) => toast(message);
  const navigate=useNavigate();
  const [loginDetails,setDetails]=useState({
    email:"",
    password:""
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const {status,data}=await axios.post(`${route()}signin`,loginDetails,{Headers:{"Content-Type":"application/json"}});
      
    if(status===200){
      localStorage.setItem("Auth",data.token);
      notify(data.msg)
      navigate('/')
    }
  
    } catch (error) {
     
      notify(error.response.data.msg)
    }
  };
  const handleChange=(e)=>{
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }

  return (
    <div className="login">
       
    <div className="container">
    <div className="center">
        <h1>Login</h1>
        <form  id="forms">
            <div className="txt_field">
                <input type="email" name="email" onChange={handleChange} required id="email"/>
                <span></span>
                <label>Email</label>
            </div>
            <div className="txt_field">
                <input type="password" name="password" onChange={handleChange} required id="password"/>
                <span></span>
                <label>Password</label>
            </div>
          <div className='forgot'><Link  to={'/'}>  Forgot Password?</Link></div>
            <input name="submit" onClick={handleSubmit} type="Submit" />
            <div className="signup_link">
                Create an Account <Link to={'/email'}>Sign Up</Link>
            </div>
        </form>
    </div>
  </div>
  <ToastContainer 
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHove/>
  </div>
  
  );
 
};

export default Login;
