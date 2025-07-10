import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ milkType: '', sizesAvailable: '', notes: '' });

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/products', {
      milkType: form.milkType,
      sizesAvailable: form.sizesAvailable.split(',').map(s => s.trim()),
      notes: form.notes
    }, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ milkType: '', sizesAvailable: '', notes: '' });
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Milk Products</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Milk Type" value={form.milkType} onChange={e => setForm({ ...form, milkType: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Sizes (comma separated)" value={form.sizesAvailable} onChange={e => setForm({ ...form, sizesAvailable: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 rounded">Add Product</button>
      </form>
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr>
            <th>Milk Type</th>
            <th>Sizes</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id} className="text-center border-t">
              <td>{prod.milkType}</td>
              <td>{prod.sizesAvailable.join(', ')}</td>
              <td>{prod.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
