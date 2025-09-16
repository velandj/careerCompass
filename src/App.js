import React, { useState, useEffect } from 'react';
import LoginForm from './Login/LoginForm';
import SignUpForm from './Login/SignUpForm';
import Dashboard from './dashboard/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { authAPI } from './api/apiService';

function App() {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      
      if (token && username) {
        try {
          const response = await authAPI.verifyToken();
          if (response.valid) {
            setUser(username);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('user_id');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleSignUp = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    setUser(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Dashboard username={user} onLogout={handleLogout} />;
  }

  return (
    <div>
      {isSignUp ? (
        <SignUpForm 
          onSignUp={handleSignUp} 
          onSwitch={() => setIsSignUp(false)} 
        />
      ) : (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitch={() => setIsSignUp(true)} 
        />
      )}
    </div>
  );
}

export default App;