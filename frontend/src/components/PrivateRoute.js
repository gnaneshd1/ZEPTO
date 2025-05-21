// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import the auth context

const PrivateRoute = () => {
  const { user } = useAuth();  // Get user from context

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child route
  return <Outlet />;
};

export default PrivateRoute;
