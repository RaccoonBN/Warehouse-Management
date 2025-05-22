// frontend/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage'; // Thay thế LoginPage
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
      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} /> {/* Thay thế /login */}
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/auth" />} /> {/* Thay thế /login */}
      <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/auth" />} /> {/* Thay thế /login */}
      <Route path="/products/add" element={user ? <ProductForm /> : <Navigate to="/auth" />} /> {/* Thay thế /login */}
      <Route path="/products/edit/:id" element={user ? <ProductForm /> : <Navigate to="/auth" />} /> {/* Thay thế /login */}
    </Routes>
  );
}

export default App;