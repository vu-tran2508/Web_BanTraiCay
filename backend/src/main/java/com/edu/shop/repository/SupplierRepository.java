package com.edu.shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
	List<Supplier> findByNameContaining(String Name);

	Page<Supplier> findByNameContaining(String Name, Pageable pageable);

	Optional<Supplier> findByAddress(String address);

	Optional<Supplier> findByName(String name);

}
