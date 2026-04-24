import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';
import { formatINR } from '../utils/currency';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, tax, total, clearCart, addOrderToHistory, loading } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    instructions: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [coupon, setCoupon] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-green-600" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-2xl font-semibold">No items to checkout</h2>
        <p className="text-gray-600">Add some dishes to your cart first.</p>
        <button
          onClick={() => navigate('/menu')}
          className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setApiError('Please log in to place an order.');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        paymentMethod,
        deliveryAddress: form,
        coupon: coupon.trim() || undefined,
        items: items.map((i) => ({
          name: i.name,
          image: i.image || '',
          price: i.price,
          quantity: i.quantity,
        })),
      };

      const res = await fetch(`${API_BASE}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'Failed to create order');
        return;
      }

      clearCart();
      addOrderToHistory(data);
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setApiError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const effectiveCoupon = coupon.trim().toUpperCase() === 'WELCOME10';
  const discount = effectiveCoupon ? subtotal * 0.1 : 0;
  const grandTotal = Math.max(0, total - discount);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h2 className="mb-4 text-2xl font-semibold">Checkout</h2>
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-4 shadow">
          <h3 className="text-lg font-semibold">Delivery details</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-600">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">Pincode</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Delivery instructions
              </label>
              <input
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <h3 className="mb-2 text-lg font-semibold">Payment</h3>
            <div className="grid gap-2 md:grid-cols-3">
              {['COD', 'UPI', 'Card'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold ${
                    paymentMethod === method
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {method === 'COD' ? 'Cash on Delivery' : method === 'UPI' ? 'UPI Payment' : 'Card'}
                </button>
              ))}
            </div>
          </div>

          {apiError && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {apiError}
            </div>
          )}

          <div className="pt-2">
            <h3 className="mb-2 text-sm font-semibold">Coupon</h3>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon (e.g. WELCOME10)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {effectiveCoupon && (
                <span className="self-center text-xs font-semibold text-green-600">
                  10% OFF applied
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? 'Placing order…' : 'Place order'}
          </button>
        </form>

        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-3 text-lg font-semibold">Order summary</h3>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>{formatINR(deliveryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>{formatINR(tax)}</span>
            </div>
            {effectiveCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Coupon discount</span>
                <span>- {formatINR(discount)}</span>
              </div>
            )}
            <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatINR(grandTotal)}</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Estimated delivery time:{' '}
              <span className="font-semibold text-gray-700">30–40 minutes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

