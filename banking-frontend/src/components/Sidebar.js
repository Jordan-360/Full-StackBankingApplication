import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>BankApp</h2>
      <button className="sidebar-button" onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button className="sidebar-button" onClick={() => navigate("/accounts")}>Accounts</button>
      <button className="sidebar-button" onClick={() => navigate("/transactions")}>Transactions</button>
    </div>
  );
}