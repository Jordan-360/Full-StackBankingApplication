import React, { useState } from "react";

export default function AccountForm({ onCreate }) {
  const [ownerName, setOwnerName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!ownerName.trim()) return alert("Enter a name");
    await onCreate(ownerName.trim(), initialBalance ? parseFloat(initialBalance) : 0);
    setOwnerName("");
    setInitialBalance("");
  };

  return (
    <form onSubmit={submit} className="flex-col gap-8">
      <input type="text" placeholder="Account name" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
      <input type="number" placeholder="Initial balance (optional)" value={initialBalance} onChange={e => setInitialBalance(e.target.value)} />
      <button type="submit" className="primary">Create Account</button>
    </form>
  );
}