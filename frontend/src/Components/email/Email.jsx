// src/components/VerifyEmail.js
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import route from '../route';
import './Email.scss'; // Importing the SCSS file for styling

const Email = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState(''); 

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault(); 
    const {status,data}=await axios.post(`${route()}verifyemail`,{email},{Headers:{"Content-Type":"application/json"}});
    
    if(status===200){
      localStorage.setItem('email',email);
      alert(data.msg);
      navigate('/login')
    }else if(status===403){
      alert(data.msg)
    }
    else{
      alert(data.msg)
    }
  };

  return (
  
    <div className="email">
      <div className="container">
        <h1>User Registration</h1>
        <form id="forms" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit} >VERIFY
          </button>
          <div className="extra-links">
          <p className="back-to-login">
            <Link to={'/login'}>Back to Login</Link>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
