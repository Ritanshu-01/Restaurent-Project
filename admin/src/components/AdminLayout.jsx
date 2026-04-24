import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authStore } from '../lib/auth';

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = authStore.getUser();
  const logout = () => {
    authStore.clearSession();
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <h2>Crispy Admin</h2>
        <p className="muted">{user?.email}</p>
        <nav>
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/menu">Manage Menu</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <button onClick={logout} className="danger">Logout</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
