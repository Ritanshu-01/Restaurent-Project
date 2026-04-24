import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { API_BASE } from '../config/api';
import { formatINR } from '../utils/currency';

const steps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

export default function OrdersPage() {
  const { orders: localOrders, reorder } = useCart();
  const [apiOrders, setApiOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/api/orders/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApiOrders(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const merged = [
    ...apiOrders.map((o) => ({
      id: o._id,
      items: o.items || [],
      total: o.totalAmount ?? 0,
      paymentMethod: o.paymentMethod,
      orderStatus: o.orderStatus || 'Pending',
      estimatedDelivery: o.estimatedDelivery || '30-40 min',
      createdAt: o.createdAt,
    })),
    ...localOrders.filter((lo) => !apiOrders.some((ao) => ao._id === lo.id)),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-green-600" />
      </div>
    );
  }

  if (!merged.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-2xl font-semibold">No orders yet</h2>
        <p className="text-gray-600">Place your first order to see it here.</p>
        <Link
          to="/menu"
          className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h2 className="mb-4 text-2xl font-semibold">Your Orders</h2>
      <div className="space-y-4">
        {merged.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="text-sm font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Placed on</p>
                <p className="text-sm">
                  {new Date(order.createdAt).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm font-semibold">{formatINR(order.total)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment</p>
                <p className="text-sm font-semibold">{order.paymentMethod}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => reorder(order)}
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-green-600 hover:text-green-700"
                >
                  Reorder
                </button>
              </div>
            </div>

            <div className="mt-3 border-t border-gray-100 pt-3 text-sm">
              <p className="mb-1 font-semibold">Items</p>
              <ul className="space-y-1 text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={item.id || item._id || idx}>
                    {item.name} × {item.quantity} — {formatINR((item.price || 0) * (item.quantity || 1))}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 border-t border-gray-100 pt-3">
              <p className="mb-2 text-xs font-semibold text-gray-600">
                Order status: <span className="text-gray-900">{order.orderStatus}</span>
              </p>
              <div className="flex items-center justify-between gap-2">
                {steps.map((step) => {
                  const currentIndex = steps.indexOf(order.orderStatus);
                  const stepIndex = steps.indexOf(step);
                  const isDone = stepIndex <= currentIndex;
                  return (
                    <div key={step} className="flex flex-1 flex-col items-center text-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          isDone ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {stepIndex + 1}
                      </div>
                      <span className="mt-1 text-[10px] text-gray-600">{step}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Estimated delivery: {order.estimatedDelivery || '30–40 minutes'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

