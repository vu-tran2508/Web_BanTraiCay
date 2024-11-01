package com.edu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.ProductImage;

@Repository
public interface ProductImageRepostory  extends JpaRepository<ProductImage, Integer>{
}
