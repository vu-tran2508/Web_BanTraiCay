package com.edu.shop.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.domain.Category;
import com.edu.shop.domain.Product;

public interface ProductService {

	void deleteAll();

	void deleteAll(Iterable<? extends Product> entities);

	void deleteAllById(Iterable<? extends Integer> ids);

	Product getReferenceById(Integer id);

	void delete(Product entity);

	Product getById(Integer id);

	void deleteById(Integer id);

	long count();

	<S extends Product, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction);

	Product getOne(Integer id);

	void deleteAllInBatch();

	<S extends Product> boolean exists(Example<S> example);

	void deleteAllByIdInBatch(Iterable<Integer> ids);

	boolean existsById(Integer id);

	void deleteAllInBatch(Iterable<Product> entities);

	Optional<Product> findById(Integer id);

	void deleteInBatch(Iterable<Product> entities);

	List<Product> findAll();

	<S extends Product> S saveAndFlush(S entity);

	Page<Product> findAll(Pageable pageable);

	void flush();

	List<Product> findAll(Sort sort);

	List<Product> findByCategory_CategoryIdIn(List<Long> categoryIds);

	Page<Product> findByNameContaining(String Name, Pageable pageable);

	List<Product> findByNameContaining(String Name);

	<S extends Product> S save(S entity);
	
	void uploadImage(Integer productId, MultipartFile[] imageFiles);
	
	List<Product> findByCategory(Category category);

	List<Product> findByPriceRange(Double minPrice, Double maxPrice);

	List<Product> findByCategory_CategoryId(Long categoryId);

	List<Product> findBySupplier_SupplierIdIn(List<Long> supplierIds);

	List<Product> findBySupplier_SupplierId(Long supplierId);

	List<Product> findByCategory_SlugIn(List<String> categorySlugs);

	

}