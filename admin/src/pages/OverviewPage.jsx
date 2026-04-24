import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function OverviewPage() {
  const [stats, setStats] = useState({ foods: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.foods(), api.orders(), api.users()])
      .then(([foods, orders, users]) => {
        setStats({ foods: foods.length, orders: orders.length, users: users.length });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel">Loading dashboard...</div>;

  return (
    <div className="grid stats">
      <div className="panel"><h3>Total Menu Items</h3><p>{stats.foods}</p></div>
      <div className="panel"><h3>Total Orders</h3><p>{stats.orders}</p></div>
      <div className="panel"><h3>Total Users</h3><p>{stats.users}</p></div>
    </div>
  );
}
