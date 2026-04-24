import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.orders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (orderId, status) => {
    try {
      await api.updateOrderStatus(orderId, status);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="panel">Loading orders...</div>;
  return (
    <div className="panel">
      <h2>Orders</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.deliveryAddress?.name || 'N/A'}</td>
              <td>₹{Number(order.totalAmount || 0).toFixed(2)}</td>
              <td>
                <select value={order.orderStatus} onChange={(e) => setStatus(order._id, e.target.value)}>
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
