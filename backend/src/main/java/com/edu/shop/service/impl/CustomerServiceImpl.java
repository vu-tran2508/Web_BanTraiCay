package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Order;
import com.edu.shop.repository.CustomerRepository;
import com.edu.shop.service.CustomerService;
import com.edu.shop.service.StorageService;

@Service
public class CustomerServiceImpl implements CustomerService{
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	StorageService storageService;
	@Override
	public Optional<Customer> findByUsername(String username) {
		return customerRepository.findByUsername(username);
	}



	@Override
	public Page<Customer> findByUsernameContaining(String username, Pageable pageable) {
		return customerRepository.findByUsernameContaining(username, pageable);
	}
	
	

	@Override
	public Optional<Customer> findByEmail(String email) {
		return customerRepository.findByEmail(email);
	}



	@Override
	public List<Order> findAllOrdersByUsername(String username) {
		return customerRepository.findAllOrdersByUsername(username);
	}

	@Override
	public <S extends Customer> S save(S entity) {
		return customerRepository.save(entity);
	}
	
	@Override
	public void uploadImage(Integer customerId,  MultipartFile imageFile) {
		Optional<Customer> optional = findById(customerId);
		  Customer entity = optional.get();
		if (imageFile != null && !imageFile.isEmpty()) {
			UUID uuid = UUID.randomUUID();
			String uustring = uuid.toString();
			entity.setImage(storageService.getStoreFilename(imageFile, uustring));
			storageService.store(imageFile, entity.getImage());
			save(entity);
		}

		
		
		
	}

	@Override
	public List<Customer> findAll(Sort sort) {
		return customerRepository.findAll(sort);
	}

	@Override
	public void flush() {
		customerRepository.flush();
	}

	@Override
	public Page<Customer> findAll(Pageable pageable) {
		return customerRepository.findAll(pageable);
	}

	@Override
	public List<Customer> findAll() {
		return customerRepository.findAll();
	}

	@Override
	public Optional<Customer> findById(Integer id) {
		return customerRepository.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		return customerRepository.existsById(id);
	}

	@Override
	public long count() {
		return customerRepository.count();
	}

	@Override
	public void deleteById(Integer id) {
		customerRepository.deleteById(id);
	}

	@Override
	public Customer getById(Integer id) {
		return customerRepository.getById(id);
	}

	@Override
	public void delete(Customer entity) {
		customerRepository.delete(entity);
	}

	@Override
	public void deleteAll() {
		customerRepository.deleteAll();
	}
	
	
	

}
