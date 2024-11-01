package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import com.edu.shop.domain.ProductImage;

public interface ProductImageService {

	void deleteAll();

	void delete(ProductImage entity);

	ProductImage getById(Integer id);

	void deleteById(Integer id);

	ProductImage getOne(Integer id);

	Optional<ProductImage> findById(Integer id);

	List<ProductImage> findAll();

	<S extends ProductImage> S save(S entity);


}
