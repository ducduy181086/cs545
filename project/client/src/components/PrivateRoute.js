import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * PrivateRoute component to restrict access based on authentication and roles.
 * @param {ReactNode} children - The component to render if access is allowed.
 * @param {string} role - The role required to access the route.
 */
const PrivateRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and does not match, redirect to a "Not Authorized" page
  if (role && user?.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default PrivateRoute;
