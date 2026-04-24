import React from 'react';
import { Navigate } from 'react-router-dom';
import { authStore } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const token = authStore.getToken();
  const user = authStore.getUser();
  if (!token || !user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
