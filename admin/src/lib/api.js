import { authStore } from './auth';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const token = authStore.getToken();
  const headers = {
    ...(options.headers || {})
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) {
      authStore.clearSession();
    }
    const error = new Error(data.error || 'Request failed');
    error.status = response.status;
    throw error;
  }
  return data;
}

export const api = {
  adminLogin: (payload) =>
    request('/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }),
  foods: (query = '') => request(`/api/foods${query ? `?${query}` : ''}`),
  createFood: (formData) =>
    request('/api/foods', {
      method: 'POST',
      body: formData
    }),
  updateFood: (id, formData) =>
    request(`/api/foods/${id}`, {
      method: 'PUT',
      body: formData
    }),
  deleteFood: (id) =>
    request(`/api/foods/${id}`, {
      method: 'DELETE'
    }),
  orders: () => request('/api/orders/all'),
  updateOrderStatus: (id, status) =>
    request(`/api/orders/status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }),
  users: () => request('/api/admin/users'),
  deleteUser: (id) =>
    request(`/api/admin/users/${id}`, {
      method: 'DELETE'
    })
};
