import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">Today’s Deliveries</h2>
        <div className="text-4xl font-extrabold">{data.deliveriesToday}</div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">Cash Collected</h2>
        <div className="text-2xl">{data.cashCollected} BDT</div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">Outstanding Balances</h2>
        <ul>
          {data.outstandingBalances.map((cust) => (
            <li key={cust._id}>{cust.name}: {cust.balance} BDT</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">P&L</h2>
        <div className="text-2xl">{data.pnl} BDT</div>
      </div>
    </div>
  );
}

export default Dashboard;
