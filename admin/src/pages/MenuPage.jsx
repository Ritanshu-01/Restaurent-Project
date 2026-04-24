import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const initialForm = {
  name: '',
  description: '',
  category: 'Main Course',
  price: '',
  available: true,
  featured: false,
  discountPercent: 0,
  image: ''
};

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await api.foods();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load().catch(() => setMessage('Failed to load menu.'));
  }, []);

  const filtered = useMemo(
    () => items.filter((x) => x.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const toFormData = () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, String(value)));
    if (file) fd.append('image', file);
    return fd;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await api.updateFood(editingId, toFormData());
        setMessage('Menu item updated.');
      } else {
        await api.createFood(toFormData());
        setMessage('Menu item created.');
      }
      setForm(initialForm);
      setEditingId(null);
      setFile(null);
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.deleteFood(id);
      setMessage('Menu item deleted.');
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="grid two">
      <form className="panel" onSubmit={submit}>
        <h2>{editingId ? 'Edit Item' : 'Add Item'}</h2>
        {message && <div className="info">{message}</div>}
        <input placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
        <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
          <option>Starters</option><option>Main Course</option><option>Desserts</option><option>Beverages</option>
        </select>
        <input type="number" min="1" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
        <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <label><input type="checkbox" checked={form.available} onChange={(e) => setForm((p) => ({ ...p, available: e.target.checked }))} /> Available</label>
        <label><input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} /> Featured</label>
        <button>{editingId ? 'Update Item' : 'Create Item'}</button>
      </form>

      <div className="panel">
        <h2>Menu Items</h2>
        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        {loading ? <p>Loading...</p> : (
          <table>
            <thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>₹{Number(item.price || 0).toFixed(2)}</td>
                  <td>{item.category}</td>
                  <td>
                    <button type="button" onClick={() => { setEditingId(item._id); setForm({ ...initialForm, ...item }); }}>Edit</button>
                    <button type="button" className="danger" onClick={() => remove(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
