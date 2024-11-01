package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Order;

public interface CustomerService {

	void deleteAll();

	void delete(Customer entity);

	Customer getById(Integer id);

	void deleteById(Integer id);

	long count();

	boolean existsById(Integer id);

	Optional<Customer> findById(Integer id);

	List<Customer> findAll();

	Page<Customer> findAll(Pageable pageable);

	void flush();

	List<Customer> findAll(Sort sort);

	<S extends Customer> S save(S entity);

	List<Order> findAllOrdersByUsername(String username);

	Page<Customer> findByUsernameContaining(String username, Pageable pageable);


	Optional<Customer> findByUsername(String username);

	void uploadImage(Integer customerId, MultipartFile imageFile);

	Optional<Customer> findByEmail(String email);

}
