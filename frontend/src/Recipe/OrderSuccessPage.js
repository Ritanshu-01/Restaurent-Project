import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl text-green-600">✓</span>
      </div>
      <h2 className="text-2xl font-semibold">Order placed successfully!</h2>
      <p className="mt-2 text-gray-600">
        Your order <span className="font-semibold">{orderId}</span> is now being prepared.
      </p>
      <p className="mt-1 text-sm text-gray-500">
        You can track your order status on the orders page.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/orders"
          className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
        >
          View orders
        </Link>
        <Link
          to="/menu"
          className="rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:border-green-600 hover:text-green-700"
        >
          Continue browsing
        </Link>
      </div>
    </div>
  );
}

