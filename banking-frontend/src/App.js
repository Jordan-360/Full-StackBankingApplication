import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import AccountForm from "./components/AccountForm";
import AccountList from "./components/AccountList";
import AccountDetails from "./components/AccountDetails";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const API_BASE = "http://localhost:8080/api";

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/accounts`);
      setAccounts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("fetchAccounts:", err);
      setAccounts([]);
    }
  };

const createAccount = async (ownerName, balance) => {
  try {
    const res = await axios.post(`${API_BASE}/accounts`, null, {
      params: { ownerName, balance: balance ?? 0 },
    });

    if (res?.data) {
      const newAccount = res.data;

      // Add the new account to the list WITHOUT changing selection
      setAccounts(prev => [...prev, newAccount]);

      // Optional: only select if you want
      // setSelectedAccount(newAccount);
    }
  } catch (err) {
    console.error("createAccount:", err);
    alert(err?.response?.data || "Failed to create account");
  }
};

  const handleTransactionComplete = async (accountId) => {
    try {
      const res = await axios.get(`${API_BASE}/accounts/${accountId}`);
      if (res?.data) {
        setSelectedAccount(res.data);
        // update accounts state with latest balances
        setAccounts(prev => prev.map(a => a.id === accountId ? res.data : a));
      }
    } catch (err) {
      console.error("handleTransactionComplete:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="App app-container">
      <div className="sidebar">
        <h2>JCU</h2>
        <div style={{ marginTop: 12 }}>
          <AccountForm onCreate={createAccount} />
        </div>
        <div style={{ marginTop: 18 }}>
          <h4 style={{ color: "#fff" }}>All Accounts</h4>
          <AccountList
            accounts={accounts}
            selectedId={selectedAccount?.id}
            onSelect={(acc) => setSelectedAccount(acc)}
          />
        </div>
        <div style={{ marginTop: 18 }}>
          <button
            className="primary"
            onClick={async () => {
              await axios.delete(`${API_BASE}/accounts/all`);
              setAccounts([]);
              setSelectedAccount(null);
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="main-section">
        <div className="header">
          <h1>Welcome to Jordan's Credit Union</h1>
          <div>
            <button
              className="primary"
              onClick={() => setSelectedAccount(null)}
            >
              Clear Selection
            </button>
          </div>
        </div>

        <div className="content">
          <Dashboard accounts={accounts} />
          <div style={{ marginTop: 20 }}>
            {selectedAccount ? (
              <AccountDetails
                account={selectedAccount}
                onTxComplete={() =>
                  handleTransactionComplete(selectedAccount.id)
                }
              />
            ) : (
              <div className="card">
                <h3>No account selected</h3>
                <p>
                  Select an account from the left to view details and perform
                  transactions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;