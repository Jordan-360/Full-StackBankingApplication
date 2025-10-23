package com.Jordan.BankingApp.service;

import com.Jordan.BankingApp.model.Account;
import com.Jordan.BankingApp.model.Transaction;
import com.Jordan.BankingApp.repository.AccountRepository;
import com.Jordan.BankingApp.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository txRepo;
    private final AccountRepository accRepo;

    public TransactionService(TransactionRepository txRepo, AccountRepository accRepo) {
        this.txRepo = txRepo;
        this.accRepo = accRepo;
    }

    public List<Transaction> getTransactionsByAccount(Long accountId) {
        return txRepo.findDistinctByAccount_Id(accountId);
    }

    @Transactional
    public Transaction createTransaction(Long accountId, Double amount, String type) {
        Account account = accRepo.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (amount == null || amount <= 0) throw new RuntimeException("Amount must be positive");

        Transaction tx;
        switch (type.toUpperCase()) {
            case "DEPOSIT":
                account.setBalance(account.getBalance() + amount);
                tx = new Transaction(amount, "DEPOSIT", account);
                break;
            case "WITHDRAW":
                if (account.getBalance() < amount) throw new RuntimeException("Insufficient funds");
                account.setBalance(account.getBalance() - amount);
                tx = new Transaction(amount, "WITHDRAW", account);
                break;
            default:
                throw new RuntimeException("Unknown transaction type: " + type);
        }

        account.addTransaction(tx);
        accRepo.save(account);   
        return tx;
    }

}
