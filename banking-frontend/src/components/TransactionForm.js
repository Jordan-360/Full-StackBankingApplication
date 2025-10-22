import React, { useState } from "react";

function TransactionForm({ accountId, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (type) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if (loading) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, amount: Number(amount), type }),
      });

      if (!res.ok) throw new Error("Transaction failed");

      await res.json();
      setMessage(`${type} successful!`);
      setAmount("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Transaction error:", err);
      setMessage("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form flex-col gap-8">
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button disabled={loading} className="primary" onClick={() => handleSubmit("deposit")}>Deposit</button>
      <button disabled={loading} className="primary" onClick={() => handleSubmit("withdraw")}>Withdraw</button>
      {message && (
        <div className="transaction-message" style={{ color: loading ? "gray" : "#00796b", marginTop: 10 }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default TransactionForm;