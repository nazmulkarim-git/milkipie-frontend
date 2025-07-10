import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Payments({ token }) {
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [form, setForm] = useState({ amount: '', method: 'Cash' });

  useEffect(() => {
    axios.get('https://milkipie-backend.onrender.com/api/customers', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCustomers(res.data));
  }, [token]);

  useEffect(() => {
    if (selectedCustomer) {
      axios.get(`https://milkipie-backend.onrender.com/api/payments/customer/${selectedCustomer}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setPayments(res.data));
    }
  }, [selectedCustomer, token]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://milkipie-backend.onrender.com/api/payments', {
      customerId: selectedCustomer,
      amount: Number(form.amount),
      method: form.method
    }, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ amount: '', method: 'Cash' });
    // refresh
    axios.get(`https://milkipie-backend.onrender.com/api/payments/customer/${selectedCustomer}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setPayments(res.data));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments & Collection</h2>
      <select
        className="border p-2 rounded mb-4"
        value={selectedCustomer}
        onChange={e => setSelectedCustomer(e.target.value)}
      >
        <option value="">Select Customer</option>
        {customers.map(c => (
          <option key={c._id} value={c._id}>{c.name} ({c.customerId})</option>
        ))}
      </select>
      {selectedCustomer &&
        <>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input className="border p-2 rounded" placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
            <select className="border p-2 rounded" value={form.method} onChange={e => setForm({ ...form, method: e.target.value })}>
              <option>Cash</option>
              <option>bKash</option>
              <option>Nagad</option>
              <option>Other</option>
            </select>
            <button className="bg-green-500 text-white px-4 rounded">Add Payment</button>
          </form>
          <h3 className="font-semibold mb-2">Payment History</h3>
          <table className="w-full bg-white rounded-xl shadow-lg">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id} className="text-center border-t">
                  <td>{(new Date(p.date)).toLocaleDateString()}</td>
                  <td>{p.amount}</td>
                  <td>{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    </div>
  );
}

export default Payments;
