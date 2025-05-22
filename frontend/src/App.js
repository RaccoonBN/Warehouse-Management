// frontend/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './components/ProductForm'; 
import { AuthProvider, AuthContext } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/login" />} />
      <Route path="/products/add" element={user ? <ProductForm /> : <Navigate to="/login" />} />
      <Route path="/products/edit/:id" element={user ? <ProductForm /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;