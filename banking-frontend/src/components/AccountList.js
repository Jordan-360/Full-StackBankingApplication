import React from "react";

export default function AccountList({ accounts = [], selectedId, onSelect }) {
  return (
    <div>
      {accounts.length === 0 ? (
        <div className="no-accounts">No accounts</div>
      ) : (
        <div className="flex-col gap-8">
          {accounts.map(acc => (
           <div
             key={acc.id}
             onClick={() => onSelect && onSelect(acc)}
             className={`account-item ${acc.id === selectedId ? "selected" : ""}`}
           >
             <div className="account-name">{acc.ownerName ?? acc.name ?? "Unnamed"}</div>
             <div className="account-balance">
               ${typeof acc.balance === "number" ? acc.balance.toFixed(2) : (acc.balance ?? 0).toFixed?.(2) ?? "0.00"}
             </div>
           </div>
          ))}
        </div>
      )}
    </div>
  );
}