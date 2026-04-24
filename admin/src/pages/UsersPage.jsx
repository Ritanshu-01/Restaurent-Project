import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.users();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.deleteUser(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="panel">Loading users...</div>;
  return (
    <div className="panel">
      <h2>Users</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
              <td>{!user.isAdmin && <button className="danger" onClick={() => remove(user._id)}>Delete</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
