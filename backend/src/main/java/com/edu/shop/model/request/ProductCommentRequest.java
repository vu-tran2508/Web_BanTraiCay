package com.edu.shop.model.request;

import java.util.Date;

import com.edu.shop.model.dto.ProductCommentDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCommentRequest {

	private String detail;
	
	private Integer starRating;
	
	private Integer customerId;

	private Integer productId;

}
