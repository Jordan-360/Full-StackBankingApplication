package com.Jordan.BankingApp.repository;

import com.Jordan.BankingApp.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {}