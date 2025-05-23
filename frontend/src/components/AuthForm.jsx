// frontend/src/components/AuthForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import './AuthForm.css';

const AuthForm = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state
  const [role, setRole] = useState('inventory_staff'); // Default role
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", { position: "top-center" }); // Use string value
        return;
      }
      // Validate password strength
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.", { position: "top-center" }); // Use string value
        return;
      }
    }
    try {
      if (isLogin) {
        await login({ username, password });
        toast.success("Login successful!", { position: "top-center" }); // Use string value
      } else {
        await register({ username, password, role }); // Send role during registration
        toast.success("Registration successful!", { position: "top-center" }); // Use string value
      }
      navigate('/');
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error('Authentication failed: ' + error.message, { position: "top-center" }); // Use string value
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <div className="input-with-icon">
          <FaUser className="icon" />
          <input
            type="text"
            id="username"
            placeholder="Username or email"
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
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
      </div>

      {/* Show Confirm Password and Role Selection only for registration */}
      {!isLogin && (
        <>
          <div className="form-group">
            <div className="input-with-icon">
              <FaLock className="icon" />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control" // Optional: Add class for styling
            >
              <option value="inventory_staff">Inventory Staff</option>
              <option value="delivery_staff">Delivery Staff</option>
              <option value="warehouse_manager">Warehouse Manager</option>
            </select>
          </div>
        </>
      )}

      {isLogin && (
        <div className="auth-footer">
          <label className="checkbox-container">
            <input type="checkbox" /> Remember me
            <span className="checkmark"></span>
          </label>
          <a href="#">Forgot password?</a>
        </div>
      )}
      <button type="submit" className="auth-btn">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;