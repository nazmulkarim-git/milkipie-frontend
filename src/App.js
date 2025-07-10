import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import Inventory from './pages/Inventory';
import Expenses from './pages/Expenses';
import Products from './pages/Products';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-700">Milkipie Admin</div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded-lg">Logout</button>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard token={token} />} />
            <Route path="/customers" element={<Customers token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/payments" element={<Payments token={token} />} />
            <Route path="/inventory" element={<Inventory token={token} />} />
            <Route path="/expenses" element={<Expenses token={token} />} />
            <Route path="/products" element={<Products token={token} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
