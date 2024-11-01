package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.edu.shop.constants.AccountStatus;
import com.edu.shop.domain.Account;
import com.edu.shop.exception.DuplicateEmailException;
import com.edu.shop.model.dto.AccountDTO;
import com.edu.shop.repository.AccountReposttory;
import com.edu.shop.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{
	@Autowired
	AccountReposttory accountReposttory;

	@Override
	public Page<Account> findByUsernameContaining(String username, Pageable pageable) {
		return accountReposttory.findByUsernameContaining(username, pageable);
	}

	@Override
	public <S extends Account> S save(S entity) {
		return accountReposttory.save(entity);
	}
	

	@Override
	public List<Account> findByStatus(AccountStatus status) {
		return accountReposttory.findByStatus(status);
	}

	@Override
	public Optional<Account> findByEmail(String email) {
		System.out.println("EMAIL ---"+email);
		
		
		return accountReposttory.findByEmail(email);
	}

	@Override
	public List<Account> findAll(Sort sort) {
		return accountReposttory.findAll(sort);
	}

	@Override
	public Page<Account> findAll(Pageable pageable) {
		return accountReposttory.findAll(pageable);
	}

	@Override
	public Optional<Account> findById(Integer id) {
		return accountReposttory.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		return accountReposttory.existsById(id);
	}

	@Override
	public long count() {
		return accountReposttory.count();
	}

	@Override
	public void deleteById(Integer id) {
		accountReposttory.deleteById(id);
	}

	@Override
	public Account getById(Integer id) {
		return accountReposttory.getById(id);
	}

	@Override
	public void deleteAll() {
		accountReposttory.deleteAll();
	}
	
	

}
