package com.Jordan.BankingApp.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String type;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Account account;

    public Transaction() {}

    public Transaction(double amount, String type, Account account) {
        this.amount = amount;
        this.type = type.toUpperCase();
        this.account = account;
    }

    public Long getId() {
        return id;
    }
    public double getAmount() {
        return amount;
    }
    public String getType() {
        return type;
    }
    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
    public Timestamp getCreatedAt() {
        return createdAt;
    }

}
