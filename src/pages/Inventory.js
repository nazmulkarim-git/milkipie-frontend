import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory({ token }) {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({ milkType: '', size: '', quantity: '', supplierName: '', cost: '' });

  const fetchInventory = async () => {
    const res = await axios.get('http://localhost:5000/api/inventory', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setInventory(res.data);
  };

  useEffect(() => {
    fetchInventory();
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/inventory/incoming', {
      ...form, quantity: Number(form.quantity), cost: Number(form.cost)
    }, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ milkType: '', size: '', quantity: '', supplierName: '', cost: '' });
    fetchInventory();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Milk Inventory</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Milk Type" value={form.milkType} onChange={e => setForm({ ...form, milkType: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Size" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Supplier Name" value={form.supplierName} onChange={e => setForm({ ...form, supplierName: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Cost" type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} required />
        <button className="bg-blue-500 text-white px-4 rounded">Add Stock</button>
      </form>
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr>
            <th>Date</th>
            <th>Milk Type</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Supplier</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(inv => (
            <tr key={inv._id} className="text-center border-t">
              <td>{(new Date(inv.date)).toLocaleDateString()}</td>
              <td>{inv.milkType}</td>
              <td>{inv.size}</td>
              <td>{inv.quantity}</td>
              <td>{inv.supplierName}</td>
              <td>{inv.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
