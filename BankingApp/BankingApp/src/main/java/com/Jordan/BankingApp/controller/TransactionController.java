package com.Jordan.BankingApp.controller;

import com.Jordan.BankingApp.dto.TransactionRequest;
import com.Jordan.BankingApp.model.Transaction;
import com.Jordan.BankingApp.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService txService;

    public TransactionController(TransactionService txService) { this.txService = txService; }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Transaction>> getByAccount(@PathVariable Long accountId) {
        List<Transaction> transactions = txService.getTransactionsByAccount(accountId);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody TransactionRequest req) {
        try {
            Transaction tx = txService.createTransaction(req.getAccountId(), req.getAmount(), req.getType());
            return ResponseEntity.ok(tx);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}