import React, { useState } from 'react';
import { authAPI } from '../api/apiService';
import './LoginForm.css';

function LoginForm({ onLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage('');

  try {
    // 🔹 Call your login API
    const data = await authAPI.login(username, password);
    console.log("Login response:", data); // 👈 see actual backend response

    // 🔹 Extract token (support both SimpleJWT and custom login)
    const token = data.token || data.access;
    if (!token) {
      throw new Error("No token received from backend");
    }

    // 🔹 Save auth data to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("username", data.username || username);
    if (data.user_id) {
      localStorage.setItem("user_id", data.user_id);
    }

    setMessage("✅ Login successful!");
    onLogin(data.username || username);
  } catch (error) {
    console.error("Login error:", error);
    setMessage(`❌ ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {message && <div className="message">{message}</div>}
        <p>
          New here?{' '}
          <button 
            onClick={onSwitch} 
            className="link-button"
            style={{ background: 'none', border: 'none', color: '#667eea', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
