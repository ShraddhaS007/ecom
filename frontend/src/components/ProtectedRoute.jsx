// components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useShopContext } from '../context/ShopContext';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useShopContext();

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/Login" />;
  }

  return children; // If logged in, render the children (protected page)
};

export default ProtectedRoute;
