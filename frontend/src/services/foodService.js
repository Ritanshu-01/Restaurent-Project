import { API_BASE } from '../config/api';

export async function getFoodItems(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && String(val).trim() !== '') {
      searchParams.set(key, val);
    }
  });

  const query = searchParams.toString();
  const res = await fetch(`${API_BASE}/api/foods${query ? `?${query}` : ''}`);
  if (!res.ok) {
    throw new Error('Failed to fetch menu');
  }
  return res.json();
}

export async function createFoodItem(formData, token) {
  const res = await fetch(`${API_BASE}/api/foods`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create item');
  return data;
}

export async function updateFoodItem(id, formData, token) {
  const res = await fetch(`${API_BASE}/api/foods/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update item');
  return data;
}

export async function deleteFoodItem(id, token) {
  const res = await fetch(`${API_BASE}/api/foods/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete item');
  return data;
}

export async function submitFoodReview(id, payload, token) {
  const res = await fetch(`${API_BASE}/api/foods/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit review');
  return data;
}
