// frontend/src/pages/AuthPage.js
import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <img src="../assets/login.png" alt="Authentication Illustration" />
      </div>
      <div className="auth-content">
        <h1>{isLogin ? "Hello, Welcome Back!" : "Create an Account"}</h1>
        <p>{isLogin ? "Login to manage your warehouse efficiently" : "Register to start managing your warehouse"}</p>
        <AuthForm isLogin={isLogin} />
        <p className="toggle-form">
          {isLogin ? (
            <>
              Don't have an account? <button onClick={toggleForm}>Click here to register</button>
            </>
          ) : (
            <>
              Already have an account? <button onClick={toggleForm}>Click here to login</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;