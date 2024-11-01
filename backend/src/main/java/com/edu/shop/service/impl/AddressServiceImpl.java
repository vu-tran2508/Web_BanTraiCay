package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.shop.domain.Address;
import com.edu.shop.repository.AddressRepostory;
import com.edu.shop.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService{
	
	@Autowired
	AddressRepostory addressRepostory;

	@Override
	public <S extends Address> S save(S entity) {
		return addressRepostory.save(entity);
	}

	@Override
	public List<Address> findAll() {
		return addressRepostory.findAll();
	}

	@Override
	public Optional<Address> findById(Integer id) {
		return addressRepostory.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		addressRepostory.deleteById(id);
	}
	

	@Override
	public boolean existsById(Integer id) {
		return addressRepostory.existsById(id);
	}

	@Override
	public Address getById(Integer id) {
		return addressRepostory.getById(id);
	}

	@Override
	public List<Address> findByCustomer_CustomerId(Integer customerId) {
		return addressRepostory.findByCustomer_CustomerId(customerId);
	}

	@Override
	public void deleteAll() {
		addressRepostory.deleteAll();
	}
	
	
	

}
