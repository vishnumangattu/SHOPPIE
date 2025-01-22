import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to home page
import { FaCheckCircle } from 'react-icons/fa'; // Importing check icon from react-icons
import './PurchaseCompleted.scss'; // Import the SCSS file for styling

const PurchaseCompleted = () => {
  const navigate = useNavigate(); // To navigate to home page

  // Function to handle button click and redirect to home page
  const goToHome = () => {
    navigate('/'); // Redirecting to home page
  };

  return (
    <div className="purchase-completed-container">
      <div className="message-container">
        <FaCheckCircle size={60} color="blue" className="check-icon" />
        <h2 className="purchase-message">order Completed!</h2>
        <p className="purchase-details">waiting for your order shipment,we will send mail about shipping shortly. Thankyou</p>
      </div>
      <button className="home-button" onClick={goToHome}>Go to Home</button>
    </div>
  );
};

export default PurchaseCompleted;
