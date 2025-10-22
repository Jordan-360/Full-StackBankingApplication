package com.Jordan.BankingApp.controller;

import com.Jordan.BankingApp.model.Account;
import com.Jordan.BankingApp.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> getAll() {
        return accountService.getAll();
    }

    @GetMapping("/{id}")
    public Account getOne(@PathVariable Long id) {
        return accountService.getById(id);
    }

    @PostMapping
    public Account create(@RequestParam String ownerName,
                          @RequestParam(required = false) Double balance) {
        return accountService.create(ownerName, balance);
    }

    @DeleteMapping("/all")
    public String deleteAll() {
        accountService.deleteAll();
        return "Deleted all accounts";
    }
}