import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";

export default function AccountDetails({ account, onTxComplete }) {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(account?.balance ?? 0);
  const API_BASE = "http://localhost:8080/api";

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/transactions/account/${account.id}`);
      setTransactions(Array.isArray(res.data) ? res.data.reverse() : []);
    } catch (err) {
      console.error("fetchTransactions error:", err);
      setTransactions([]);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${API_BASE}/accounts/${account.id}`);
      setBalance(res.data.balance);
    } catch (err) {
      console.error("fetchBalance error:", err);
    }
  };

  useEffect(() => {
    if (account?.id) {
      fetchTransactions();
      fetchBalance();
    }
  }, [account]);

  const handleTxSuccess = () => {
    fetchTransactions();
    fetchBalance();
    if (onTxComplete) onTxComplete();
  };

  return (
    <div className="card">
      <h3>{account.ownerName}</h3>
      <p className="balance">Balance: ${Number(balance).toFixed(2)}</p>

      <div style={{ marginTop: 12 }}>
        <TransactionForm accountId={account.id} onSuccess={handleTxSuccess} />
      </div>

      <div style={{ marginTop: 18 }}>
        <h4>Transactions</h4>
        <div>
          {transactions.length === 0 ? (
            <div className="no-transactions">No transactions yet</div>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div>
                  <div className="transaction-type">{tx.type}</div>
                  <div className="transaction-date">
                    {new Date(tx.timestamp || tx.date || tx.createdAt || "").toLocaleString()}
                  </div>
                </div>
                <div
                  className={`transaction-amount ${
                    tx.type?.toLowerCase().includes("deposit") ? "deposit" : "withdrawal"
                  }`}
                >
                  ${tx.amount?.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}