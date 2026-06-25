import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      if (!toast.isActive('login-required')) {
        toast.warning('Please login to access this page.', {
          toastId: 'login-required',
        });
      }
    } else if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      if (!toast.isActive('access-denied')) {
        toast.error(
          'Access Denied: You do not have permission to view this page.',
          {
            toastId: 'access-denied',
          }
        );
      }
    }
  }, [currentUser, allowedRoles]);

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};


export const AdminBlockRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);

  if (currentUser?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

// export default ProtectedRoute;