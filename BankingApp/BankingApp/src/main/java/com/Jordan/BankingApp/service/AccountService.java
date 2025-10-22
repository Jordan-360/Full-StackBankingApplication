package com.Jordan.BankingApp.service;

import com.Jordan.BankingApp.model.Account;
import com.Jordan.BankingApp.model.Transaction;
import com.Jordan.BankingApp.repository.AccountRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountService {
    private final AccountRepository repo;

    public AccountService(AccountRepository repo) { this.repo = repo; }

    public List<Account> getAll() { return repo.findAll(); }

    public Account getById(Long id) { return repo.findById(id).orElse(null); }

    public Account create(String ownerName, Double balance) {
        if (balance == null) balance = 0.0;
        Account a = new Account(ownerName, balance);
        if (balance > 0) {
            Transaction tx = new Transaction(balance, "DEPOSIT", a);
            a.addTransaction(tx);
        }
        return repo.save(a);
    }

    public Account save(Account a) { return repo.save(a); }

    public void deleteAll() { repo.deleteAll(); }
}