// frontend/src/pages/AuthPage.js
import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const pageTitle = isLogin ? "Welcome back" : "Create an Account";
  const pageSubtitle = isLogin ? (
    <>Login to manage your warehouse efficiently.</>
  ) : (
    <>Register to start managing your warehouse.</>
  );

  return (
    <div className="auth-page">
      <div className="auth-card"> {/* Main container for the split layout */}
        <div className="auth-illustration">
          <img src={isLogin ? "../assets/login.png" : "../assets/login.png"} alt="Authentication Illustration" />
        </div>
        <div className="auth-content">
          <h1>{pageTitle}</h1>
          <p className="auth-subtitle">{pageSubtitle}</p> {/* Added subtitle class */}
          <AuthForm isLogin={isLogin} />
          <p className="toggle-form-text">
            {isLogin ? (
              <>
                Don't have an account? <button onClick={toggleForm} className="toggle-btn">Click here</button>
              </>
            ) : (
              <>
                Already have an account? <button onClick={toggleForm} className="toggle-btn">Click here</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;