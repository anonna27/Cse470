
import React from 'react';
import './Login.css'; // Create and style this file as needed

const Login = ({ onClose }) => {
  // Implement login form logic here
  return (
    <div className="login-form">
      <h2>Login</h2>
      {/* Form fields and submit button */}
      <button onClick={onClose}>Close</button> {/* Close button */}
    </div>
  );
};

export default Login;
