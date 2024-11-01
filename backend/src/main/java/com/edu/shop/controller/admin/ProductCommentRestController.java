package com.edu.shop.controller.admin;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.constants.CommentStatus;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductComment;
import com.edu.shop.model.dto.ProductCommentDto;
import com.edu.shop.model.request.ProductCommentRequest;
import com.edu.shop.service.CustomerService;
import com.edu.shop.service.ProductCommentService;
import com.edu.shop.service.ProductService;

@RestController
@RequestMapping("/api/admin/product-comments")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductCommentRestController {
	   @Autowired
	    private ProductCommentService productCommentService;
	    @Autowired
	    ProductService productService;
	    
	    @Autowired
	    CustomerService customerService;
	    

	    // Get all product comments
	    @GetMapping
	    public ResponseEntity<List<ProductComment>> getAllProductComments() {
	        List<ProductComment> productComments = productCommentService.findByStatus(CommentStatus.PENDING);
	        return new ResponseEntity<>(productComments, HttpStatus.OK);
	    }

	    // Get product comments by status
	    @GetMapping("/status/{commentId}")
	    public ResponseEntity<String> getProductCommentsByStatus(@PathVariable Integer commentId) {
	        Optional<ProductComment> productComments = productCommentService.findById(commentId);
	        ProductComment comment = productComments.get();
	        comment.setStatus(CommentStatus.REJECTED);
	        productCommentService.save(comment);
	        return new ResponseEntity<>("Oke", HttpStatus.OK);
	    }

	    // Get product comments by product
	    @GetMapping("/{productId}")
	    public ResponseEntity<List<ProductComment>> getProductCommentsByProduct(@PathVariable Integer productId) {
	        Optional<Product> productOptional = productService.findById(productId);

	        if (productOptional.isPresent()) {
	            Product product = productOptional.get();

	            // Lấy danh sách bình luận không có trạng thái REJECTED
	            List<ProductComment> productComments = productCommentService.findByProduct(product);
	            List<ProductComment> nonRejectedComments = productComments.stream()
	                    .filter(comment -> comment.getStatus() != CommentStatus.REJECTED)
	                    .collect(Collectors.toList());

	            return new ResponseEntity<>(nonRejectedComments, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }


	    @PostMapping
	    public ResponseEntity<ProductComment> addProductComment(@RequestBody ProductCommentRequest commentRequest ) {
	        ProductComment productComment = new ProductComment();

	        Optional<Customer> optionalCustomer = customerService.findById(commentRequest.getCustomerId());
	        if (optionalCustomer.isPresent()) {
	            productComment.setCustomer(optionalCustomer.get());
	        } else {
	            // Xử lý trường hợp customer không tồn tại (ví dụ: trả về ResponseEntity không hợp lệ)
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	        Optional<Product> optionalProduct = productService.findById(commentRequest.getProductId());
	        if (optionalProduct.isPresent()) {
	            productComment.setProduct(optionalProduct.get());
	        } else {
	            // Xử lý trường hợp product không tồn tại (ví dụ: trả về ResponseEntity không hợp lệ)
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	        productComment.setStatus(CommentStatus.PENDING);
	        productComment.setStarRating(commentRequest.getStarRating());
	        productComment.setDetail(commentRequest.getDetail());
	        Date date = new Date();
	        productComment.setCreateDate(date);
	        ProductComment savedProductComment = productCommentService.save(productComment);
	        return new ResponseEntity<>(savedProductComment, HttpStatus.CREATED);
	    }

	    
	    
	    // Update an existing product comment
	    @PutMapping("/{commentId}")
	    public ResponseEntity<ProductComment> updateProductComment(
	            @PathVariable Integer commentId,
	            @RequestBody ProductComment productComment) {
	        // Ensure the commentId in the path matches the productComment's ID
	        if (!commentId.equals(productComment.getCommentId())) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }

	        ProductComment updatedProductComment = productCommentService.save(productComment);
	        return new ResponseEntity<>(updatedProductComment, HttpStatus.OK);
	    }

	    // Delete a product comment
	    @DeleteMapping("/{commentId}")
	    public ResponseEntity<Void> deleteProductComment(@PathVariable Integer commentId) {
	        productCommentService.deleteById(commentId);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }

}
