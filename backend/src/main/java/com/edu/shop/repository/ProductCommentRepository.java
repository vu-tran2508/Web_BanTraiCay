package com.edu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductComment;
import java.util.List;

import com.edu.shop.constants.CommentStatus;
import com.edu.shop.domain.Customer;



@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComment, Integer>{
	     List<ProductComment> findByStatus(CommentStatus status);
	   // Custom query to retrieve comments for a product
	    List<ProductComment> findByProduct(Product product);
	    List<ProductComment> findByProductAndCustomer(Product product, Customer customer);
}