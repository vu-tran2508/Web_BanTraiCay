package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.edu.shop.constants.CommentStatus;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductComment;
import com.edu.shop.repository.ProductCommentRepository;
import com.edu.shop.service.ProductCommentService;

@Service
public class ProductCommentServiceImpl implements ProductCommentService  {
	@Autowired
	ProductCommentRepository productCommentRepository;

	@Override
	public List<ProductComment> findByStatus(CommentStatus status) {
		return productCommentRepository.findByStatus(status);
	}
	

	@Override
	public List<ProductComment> findAll() {
		return productCommentRepository.findAll();
	}


	@Override
	public List<ProductComment> findByProduct(Product product) {
		return productCommentRepository.findByProduct(product);
	}

	@Override
	public List<ProductComment> findByProductAndCustomer(Product product, Customer customer) {
		return productCommentRepository.findByProductAndCustomer(product, customer);
	}

	@Override
	public <S extends ProductComment> S save(S entity) {
		return productCommentRepository.save(entity);
	}

	@Override
	public List<ProductComment> findAll(Sort sort) {
		return productCommentRepository.findAll(sort);
	}

	@Override
	public Page<ProductComment> findAll(Pageable pageable) {
		return productCommentRepository.findAll(pageable);
	}

	@Override
	public Optional<ProductComment> findById(Integer id) {
		return productCommentRepository.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		productCommentRepository.deleteById(id);
	}

	@Override
	public ProductComment getById(Integer id) {
		return productCommentRepository.getById(id);
	}

	@Override
	public void delete(ProductComment entity) {
		productCommentRepository.delete(entity);
	}
	
	
	

	
	
	
}
