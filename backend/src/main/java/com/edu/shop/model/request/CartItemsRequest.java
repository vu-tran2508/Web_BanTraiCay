package com.edu.shop.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemsRequest {
	Integer productId;
	String name;
	Integer quantity;
	Double salePrice;
	Double discount;
	String image;
	Double discountType;
	String unit;
	String supplierName;
	String categoryName;

}
