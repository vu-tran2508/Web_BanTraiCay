package com.edu.shop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Category;
import com.edu.shop.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findByNameContaining(String Name);
	List<Product> findByCategory(Category category);
	
	List<Product> findByCategory_CategoryId(Long categoryId);

	Page<Product> findByNameContaining(String Name, Pageable pageable);

	List<Product> findByCategory_CategoryIdIn(List<Long> categoryIds);
	
	List<Product> findBySupplier_SupplierId(Long supplierId);
	List<Product> findBySupplier_SupplierIdIn(List<Long> supplierIds);
	
    List<Product> findBySalePriceBetween(Double minPrice, Double maxPrice);
    
    List<Product> findByCategory_SlugIn(List<String> categorySlugs);

}
