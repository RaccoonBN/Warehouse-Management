// frontend/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa'; // Import icons
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">WMS</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="welcome-message">
              <FaUser className="user-icon" /> Welcome, {user.username}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="login-link">
            <FaSignInAlt className="login-icon" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;