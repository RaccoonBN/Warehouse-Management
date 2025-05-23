// frontend/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './components/ProductForm';
import WarehousesPage from './pages/WarehousesPage';   // Import WarehousesPage
import StockInPage from './pages/StockInPage';         // Import StockInPage
import StockOutPage from './pages/StockOutPage';       // Import StockOutPage
import DeliveriesPage from './pages/DeliveriesPage';    // Import DeliveriesPage
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
      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
      <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/auth" />} />
       {/* Các routes mới */}
      <Route path="/warehouses" element={user ? <WarehousesPage /> : <Navigate to="/auth" />} />
      <Route path="/stock-in" element={user ? <StockInPage /> : <Navigate to="/auth" />} />
      <Route path="/stock-out" element={user ? <StockOutPage /> : <Navigate to="/auth" />} />
      <Route path="/deliveries" element={user ? <DeliveriesPage /> : <Navigate to="/auth" />} />
       <Route path="/products/add" element={user ? <ProductForm /> : <Navigate to="/auth" />} />
      <Route path="/products/edit/:id" element={user ? <ProductForm /> : <Navigate to="/auth" />} />
    </Routes>
  );
}

export default App;