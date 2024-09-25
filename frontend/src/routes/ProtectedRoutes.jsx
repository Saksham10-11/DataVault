import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import checkAuth from 'api/Authentication/checkAuthentication';
import LoadingScreen from 'components/LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authStatus = await checkAuth();
        setIsAuthenticated(authStatus);
      } catch (err) {
        console.error('Error checking authentication:', err);
        setError(err);
      }
    };
    verifyAuth();
  }, []);

  // Show loading screen while checking authentication
  if (isAuthenticated === null) {
    // return <LoadingScreen />;
    return <LoadingScreen />;
  }

  // Handle possible error
  if (error) {
    // Optionally, redirect to an error page or show an error message
    return <Navigate to="/home" />;
  }

  // Redirect to home if not authenticated
  return isAuthenticated ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;
