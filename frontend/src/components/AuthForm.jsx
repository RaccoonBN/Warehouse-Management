// frontend/src/components/AuthForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import './AuthForm.css';

const AuthForm = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ username, password });
      } else {
        await register({ username, password });
      }
      navigate('/');
    } catch (error) {
      console.error("Authentication failed:", error);
      alert('Authentication failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <div className="input-with-icon">
          <FaUser className="icon" />
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-with-icon">
          <FaLock className="icon" />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="auth-btn">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;