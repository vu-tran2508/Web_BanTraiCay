package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import com.edu.shop.domain.Address;

public interface AddressService {

	void deleteAll();

	List<Address> findByCustomer_CustomerId(Integer customerId);

	Address getById(Integer id);

	void deleteById(Integer id);

	Optional<Address> findById(Integer id);

	List<Address> findAll();

	<S extends Address> S save(S entity);

	boolean existsById(Integer id);

}
