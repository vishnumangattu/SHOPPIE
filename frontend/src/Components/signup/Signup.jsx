import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import route from '../route';
import './Signup.scss';

const Signup = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  
  const [user, setUser] = useState({
    email: email,
    username: "",
    password: "",
    cpassword: "",
    role: "",
    phone: "",
    gender: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
    phone: ""
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = () => {
    const password = user.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
    }
    return "";
  };

  const validatePhone = () => {
    const phoneRegex = /^[0-9]{10}$/; // Validate a 10-digit phone number
    if (!phoneRegex.test(user.phone)) {
      return "Phone number must be 10 digits.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({
      password: "",
      cpassword: "",
      phone: ""
    });

    // Password matching and validation
    if (user.password !== user.cpassword) {
      setErrors((prev) => ({ ...prev, cpassword: "Passwords do not match" }));
      return;
    }

    const passwordError = validatePassword();
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      return;
    }

    const phoneError = validatePhone();
    if (phoneError) {
      setErrors((prev) => ({ ...prev, phone: phoneError }));
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, status } = await axios.post(`${route()}signup`, user, {
        headers: { "Content-Type": "application/json" },
      });
      if (status === 201) {
        alert(data.msg);
        localStorage.removeItem('email');
        navigate('/Login');
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.msg || "An error occurred"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1 className='head'>Register</h1>
        <form id="forms" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              aria-label="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
              aria-label="Phone Number"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              required
              aria-label="Gender"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
            >
              <option value="">Select one option</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              aria-label="Password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password:</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={user.cpassword}
              onChange={handleChange}
              required
              aria-label="Confirm Password"
            />
            {errors.cpassword && <span className="error">{errors.cpassword}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
