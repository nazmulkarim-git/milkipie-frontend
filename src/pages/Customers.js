import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Customers({ token }) {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', address: '', phone: '', customerType: 'B2C',
    customerId: '', preferredTime: '', subscription: {
      milkType: '', size: '', quantity: 0, deliveryMode: '',
      deliveryTime: '', frequency: '', pricePerUnit: 0, specialInstruction: ''
    }
  });

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  const fetchCustomers = async () => {
    const res = await axios.get('https://milkipie-backend.onrender.com/api/auth/customers', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCustomers(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editing) {
      await axios.put(`https://milkipie-backend.onrender.com/api/auth/customers/${editing}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('https://milkipie-backend.onrender.com/api/auth/customers', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    setForm({ name: '', address: '', phone: '', customerType: 'B2C', customerId: '', preferredTime: '', subscription: { milkType: '', size: '', quantity: 0, deliveryMode: '', deliveryTime: '', frequency: '', pricePerUnit: 0, specialInstruction: '' } });
    setEditing(null);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setEditing(customer._id);
  };

  const handleDelete = async id => {
    if (window.confirm("Delete this customer?")) {
      await axios.delete(`https://milkipie-backend.onrender.com/api/auth/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCustomers();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-6 grid gap-2">
        <input className="border p-2 rounded" placeholder="Customer ID" value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <select className="border p-2 rounded" value={form.customerType} onChange={e => setForm({ ...form, customerType: e.target.value })}>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>
        <input className="border p-2 rounded" placeholder="Preferred Time" value={form.preferredTime} onChange={e => setForm({ ...form, preferredTime: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Milk Type" value={form.subscription.milkType} onChange={e => setForm({ ...form, subscription: { ...form.subscription, milkType: e.target.value } })} />
        <input className="border p-2 rounded" placeholder="Size" value={form.subscription.size} onChange={e => setForm({ ...form, subscription: { ...form.subscription, size: e.target.value } })} />
        <input className="border p-2 rounded" placeholder="Quantity" type="number" value={form.subscription.quantity} onChange={e => setForm({ ...form, subscription: { ...form.subscription, quantity: Number(e.target.value) } })} />
        <input className="border p-2 rounded" placeholder="Delivery Mode" value={form.subscription.deliveryMode} onChange={e => setForm({ ...form, subscription: { ...form.subscription, deliveryMode: e.target.value } })} />
        <input className="border p-2 rounded" placeholder="Delivery Time" value={form.subscription.deliveryTime} onChange={e => setForm({ ...form, subscription: { ...form.subscription, deliveryTime: e.target.value } })} />
        <input className="border p-2 rounded" placeholder="Frequency" value={form.subscription.frequency} onChange={e => setForm({ ...form, subscription: { ...form.subscription, frequency: e.target.value } })} />
        <input className="border p-2 rounded" placeholder="Price Per Unit" type="number" value={form.subscription.pricePerUnit} onChange={e => setForm({ ...form, subscription: { ...form.subscription, pricePerUnit: Number(e.target.value) } })} />
        <input className="border p-2 rounded" placeholder="Special Instruction" value={form.subscription.specialInstruction} onChange={e => setForm({ ...form, subscription: { ...form.subscription, specialInstruction: e.target.value } })} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editing ? 'Update' : 'Add'} Customer</button>
      </form>
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>Sub. Qty</th>
            <th>Unit Price</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id} className="text-center border-t">
              <td>{c.customerId}</td>
              <td>{c.name}</td>
              <td>{c.customerType}</td>
              <td>{c.phone}</td>
              <td>{c.subscription?.quantity}</td>
              <td>{c.subscription?.pricePerUnit}</td>
              <td>{c.balance}</td>
              <td>
                <button onClick={() => handleEdit(c)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(c._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
