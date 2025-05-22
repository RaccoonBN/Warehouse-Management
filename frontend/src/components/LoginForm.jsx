// frontend/src/components/LoginForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Warehouse Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
