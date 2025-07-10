import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      onLogin(data.token);
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl px-8 py-10 w-80">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Login</h2>
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-blue-400"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-blue-400"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
