package com.edu.shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.constants.AccountStatus;
import com.edu.shop.domain.Account;



@Repository
public interface AccountReposttory extends JpaRepository<Account, Integer> {
      
	Page<Account> findByUsernameContaining(String username, Pageable pageable);
	
	Optional<Account> findByEmail(String email);
	
	List<Account> findByStatus(AccountStatus status);

}
