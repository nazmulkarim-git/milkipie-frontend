import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await axios.get('https://milkipie-backend.onrender.com/api/orders/today', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const updateStatus = async (id, status) => {
    await axios.put(`https://milkipie-backend.onrender.com/api/orders/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Today's Orders</h2>
      {loading ? <div>Loading...</div> :
        <table className="w-full bg-white rounded-xl shadow-lg">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Milk Type</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="text-center border-t">
                <td>{o.customer?.name}</td>
                <td>{o.milkType}</td>
                <td>{o.size}</td>
                <td>{o.quantity}</td>
                <td>{o.totalPrice}</td>
                <td>{o.status}</td>
                <td>{o.comment}</td>
                <td>
                  {['Delivered', 'Skipped', 'Pending', 'Issue'].map(status =>
                    <button
                      key={status}
                      onClick={() => updateStatus(o._id, status)}
                      className="text-xs px-2 py-1 rounded-lg bg-gray-200 m-1"
                      disabled={o.status === status}
                    >
                      {status}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default Orders;
