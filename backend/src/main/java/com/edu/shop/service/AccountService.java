package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.edu.shop.constants.AccountStatus;
import com.edu.shop.domain.Account;
import com.edu.shop.model.dto.AccountDTO;

public interface AccountService {

	void deleteAll();

	Account getById(Integer id);

	void deleteById(Integer id);

	long count();

	boolean existsById(Integer id);

	Optional<Account> findById(Integer id);

	Page<Account> findAll(Pageable pageable);

	List<Account> findAll(Sort sort);

	<S extends Account> S save(S entity);

	Page<Account> findByUsernameContaining(String username, Pageable pageable);



	Optional<Account> findByEmail(String email);

	List<Account> findByStatus(AccountStatus status);

}
