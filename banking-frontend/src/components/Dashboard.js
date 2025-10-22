import React from "react";

export default function Dashboard({ accounts = [] }) {
  const total = accounts.reduce((s, a) => s + (a.balance ?? 0), 0);

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <h2>Overview</h2>
      <div className="flex-row gap-16">
        <div className="card" style={{ flex: 1 }}>
          <h4>Total Accounts</h4>
          <p className="balance">{accounts.length}</p>
        </div>
        <div className="card" style={{ flex: 2 }}>
          <h4>Total Balance</h4>
          <p className="balance">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}