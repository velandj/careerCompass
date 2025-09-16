import React, { useState } from 'react';
import { authAPI } from '../api/apiService';
import './LoginForm.css';

function SignUpForm({ onSignUp, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('⚠️ Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('⚠️ Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const data = await authAPI.register(username, password);
      
      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('user_id', data.user_id);
      
      setMessage('✅ Account created successfully!');
      onSignUp(data.username);
    } catch (error) {
      console.error('Signup error:', error);
      setMessage(`⚠️ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Choose username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Choose password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        {message && <div className="message">{message}</div>}
        <p>
          Already have an account?{' '}
          <button 
            onClick={onSwitch} 
            className="link-button"
            style={{ background: 'none', border: 'none', color: '#667eea', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
