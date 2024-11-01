package com.edu.shop.model.dto;

import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.domain.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageDTO {
	
	
       private int imageId;
	   private String[] imageUrl;
	   private MultipartFile ImageFile;
	   private Product product;

}
