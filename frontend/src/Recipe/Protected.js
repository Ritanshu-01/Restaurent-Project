import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
  const auth = localStorage.getItem('user1');
  const hasUser = !!auth;

  if (!hasUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default Protected;
