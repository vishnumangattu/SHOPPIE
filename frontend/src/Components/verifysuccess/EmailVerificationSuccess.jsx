import React from 'react';
import './EmailVerificationSuccess.scss';

const EmailVerificationSuccess = () => {

  return (
    <div className="email-verification-container">
      <div className="success-box">
        <div className="checkmark-icon">
          <i className="fa fa-check-circle"></i>
        </div>
        <h2>Verification Email Sent</h2>
        <p>
          We’ve sent a verification email to your inbox. To continue, please check your email and verify your account. Once verified, you can proceed to login.
        </p>
        <button className="login-button" >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
