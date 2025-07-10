import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Expenses({ token }) {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ date: '', category: 'Fuel', amount: '', notes: '' });

  const fetchExpenses = async () => {
    const res = await axios.get('https://milkipie-backend.onrender.com/api/auth/expenses', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://milkipie-backend.onrender.com/api/auth/expenses', {
      ...form, amount: Number(form.amount)
    }, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ date: '', category: 'Fuel', amount: '', notes: '' });
    fetchExpenses();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input className="border p-2 rounded" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <select className="border p-2 rounded" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option>Fuel</option>
          <option>Labor</option>
          <option>Maintenance</option>
          <option>Packaging</option>
          <option>Misc</option>
          <option>Fixed</option>
        </select>
        <input className="border p-2 rounded" placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 rounded">Add Expense</button>
      </form>
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp._id} className="text-center border-t">
              <td>{(new Date(exp.date)).toLocaleDateString()}</td>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>{exp.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
