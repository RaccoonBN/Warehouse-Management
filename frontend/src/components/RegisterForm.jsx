// frontend/src/components/RegisterForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      navigate('/');
    } catch (error) {
      console.error("Registration failed:", error);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;