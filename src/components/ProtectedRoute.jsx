import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      toast.warning('Please login to access this page.');
    } else if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      toast.error('Access Denied: You do not have permission to view this page.');
    }
  }, [currentUser, allowedRoles]);

  if (!currentUser) {
    // Redirect to login but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If logged in but role not allowed, send to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
