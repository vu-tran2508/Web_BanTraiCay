package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.edu.shop.constants.CommentStatus;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductComment;

public interface ProductCommentService {

	void delete(ProductComment entity);

	ProductComment getById(Integer id);

	void deleteById(Integer id);

	Optional<ProductComment> findById(Integer id);

	Page<ProductComment> findAll(Pageable pageable);

	List<ProductComment> findAll(Sort sort);

	<S extends ProductComment> S save(S entity);

	List<ProductComment> findByProductAndCustomer(Product product, Customer customer);

	List<ProductComment> findByProduct(Product product);

	List<ProductComment> findByStatus(CommentStatus status);

	List<ProductComment> findAll();

}
