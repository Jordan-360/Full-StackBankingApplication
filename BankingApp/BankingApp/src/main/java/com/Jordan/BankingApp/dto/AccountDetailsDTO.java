package com.Jordan.BankingApp.dto;
import com.Jordan.BankingApp.model.Transaction;
import java.util.List;

public class AccountDetailsDTO {
    private Long accountId;
    private String ownerName;
    private Double balance;
    private List<Transaction> transactions;

    public AccountDetailsDTO(Long accountId, String ownerName, Double balance, List<Transaction> transactions) {
        this.accountId = accountId;
        this.ownerName = ownerName;
        this.balance = balance;
        this.transactions = transactions;
    }

    // Getters
    public Long getAccountId() { return accountId; }
    public String getOwnerName() { return ownerName; }
    public Double getBalance() { return balance; }
    public List<Transaction> getTransactions() { return transactions; }
}
