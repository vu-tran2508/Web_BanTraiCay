package com.edu.shop.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
	
	private Integer orderDetailId;

	private String name;
	
	private Double discount;
	
	private Integer quantity;
	
	private Double unitPrice;

	private Integer productId;


	private Integer orderId;

}
