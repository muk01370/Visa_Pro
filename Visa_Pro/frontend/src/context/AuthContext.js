import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        try {
          // Set auth token header
          setAuthToken(localStorage.getItem('token'));
          
          // Get admin data
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
          
          setAdmin(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Authentication error:', err);
          localStorage.removeItem('token');
          setAuthToken(null);
          setAdmin(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Login
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password
      });

      // Set token in local storage
      localStorage.setItem('token', res.data.token);
      
      // Set token in axios headers
      setAuthToken(res.data.token);
      
      // Decode token to get admin data
      const decoded = jwt_decode(res.data.token);
      
      setAdmin(decoded.admin);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Logout
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Remove token from axios headers
    setAuthToken(null);
    
    // Reset state
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        admin,
        loading,
        error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;