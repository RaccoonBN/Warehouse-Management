// frontend/src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBoxes, FaTruck, FaWarehouse, FaFileImport, FaFileExport } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>WMS</h2>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className={activePath === '/' ? 'active' : ''}>
            <Link to="/" data-tip="Dashboard">
              <FaBoxes className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={activePath === '/products' ? 'active' : ''}>
            <Link to="/products" data-tip="Products">
              <FaBoxes className="icon" />
              <span>Products</span>
            </Link>
          </li>
          <li className={activePath === '/warehouses' ? 'active' : ''}>
            <Link to="/warehouses" data-tip="Warehouses">
              <FaWarehouse className="icon" />
              <span>Warehouses</span>
            </Link>
          </li>
          <li className={activePath === '/stock-in' ? 'active' : ''}>
            <Link to="/stock-in" data-tip="Stock In">
              <FaFileImport className="icon" />
              <span>Stock In</span>
            </Link>
          </li>
          <li className={activePath === '/stock-out' ? 'active' : ''}>
            <Link to="/stock-out" data-tip="Stock Out">
              <FaFileExport className="icon" />
              <span>Stock Out</span>
            </Link>
          </li>
          <li className={activePath === '/deliveries' ? 'active' : ''}>
            <Link to="/deliveries" data-tip="Deliveries">
              <FaTruck className="icon" />
              <span>Deliveries</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;