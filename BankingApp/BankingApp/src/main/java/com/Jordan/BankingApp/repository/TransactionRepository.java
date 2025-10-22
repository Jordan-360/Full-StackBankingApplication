package com.Jordan.BankingApp.repository;

import com.Jordan.BankingApp.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Fetch distinct transactions by account ID to avoid duplicates
    List<Transaction> findDistinctByAccount_Id(Long accountId);
}