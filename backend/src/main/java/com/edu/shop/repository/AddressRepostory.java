package com.edu.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Address;

@Repository
public interface AddressRepostory extends JpaRepository<Address, Integer> {
    List<Address> findByCustomer_CustomerId(Integer customerId);
}

