import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('https://milkipie-backend.onrender.com/api/auth/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => setData({})); // So even if backend fails, it doesn't crash
  }, [token]);

  if (!data) return <div>Loading...</div>;

  // Add safe defaults to prevent crash if fields are missing
  const deliveriesToday = data.deliveriesToday ?? 0;
  const cashCollected = data.cashCollected ?? 0;
  const outstandingBalances = Array.isArray(data.outstandingBalances) ? data.outstandingBalances : [];
  const pnl = data.pnl ?? 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">Today’s Deliveries</h2>
        <div className="text-4xl font-extrabold">{deliveriesToday}</div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">Cash Collected</h2>
        <div className="text-2xl">{cashCollected} BDT</div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">Outstanding Balances</h2>
        <ul>
          {outstandingBalances.length === 0 ? (
            <li>No outstanding balances</li>
          ) : (
            outstandingBalances.map((cust) => (
              <li key={cust._id || cust.name}>
                {cust.name}: {cust.balance} BDT
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="font-bold text-xl mb-2">P&amp;L</h2>
        <div className="text-2xl">{pnl} BDT</div>
      </div>
    </div>
  );
}

export default Dashboard;
