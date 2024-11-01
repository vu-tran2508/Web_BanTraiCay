package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.domain.Supplier;

public interface SupplierService {

	void deleteAll();

	Supplier getReferenceById(Long id);

	void delete(Supplier entity);

	Supplier getById(Long id);

	void deleteById(Long id);

	Supplier getOne(Long id);

	boolean existsById(Long id);

	Optional<Supplier> findById(Long id);

	List<Supplier> findAll();

	Page<Supplier> findAll(Pageable pageable);

	void flush();

	List<Supplier> findAll(Sort sort);

	<S extends Supplier> S save(S entity);

	Page<Supplier> findByNameContaining(String Name, Pageable pageable);

	List<Supplier> findByNameContaining(String Name);

	void uploadImage(Long id, MultipartFile imageFile);

	Optional<Supplier> findByName(String name);

	Optional<Supplier> findByAddress(String address);

}
