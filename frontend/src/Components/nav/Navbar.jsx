// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import './Navbar.scss'; // Import SCSS for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Navbar = ({ username, role, loggedIn , setLoggedIn }) => {
  const navigate = useNavigate();
  
  
  const [isSeller, setIsSeller] = useState(false);      
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); 

  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search query and send request to Express backend
  

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('Auth');
    setIsSeller(false);
    setIsPopoverVisible(false);
    setLoggedIn(!loggedIn);
    navigate('/');
  };

  // Toggle profile popover
  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to={'/'}>
          <img src="/images/Shopee-Logo-Transparent-Background.png" alt="Logo" className="logo-image" />
          <span className="website-name">Shoppie</span>
        </Link>
      </div>
      <div></div>
     

      {/* Right Side of Navbar */}
      <div className="navbar-right">
        {loggedIn ? (
          <>
            <h4 className='navh4'>{username}</h4>
            {/* Profile Icon & Popover */}
            <div className="profile-containerr">
              <img className="profile" src="./profile.png" alt="no image" onClick={togglePopover} />
              {isPopoverVisible && (
                <div className="profile-popover">
                  <Link to={`/profile`}>
                    <button className="popover-btn1">Profile</button>
                  </Link>
                  <button className="popover-btn2" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to={'/cart'}> {/* Adjust to the correct route for the cart */}
              <FaShoppingCart className="cart-icon" size={30} />
            </Link>
          </>
        ) : (
          <Link to={'/login'}>
            <div className="log">
              <img src="./images/profile.png" alt="" />
              <p>Login</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
