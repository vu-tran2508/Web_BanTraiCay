package com.edu.shop.model.dto;

import java.util.Date;
import java.util.List;

import com.edu.shop.constants.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

	private Integer orderId;

	private Date orderDate;

	private Double amount;

	private String note;
	
	private Double TotalDiscount;

	private OrderStatus status;

	private Integer customerId;

	private Integer paymentId;

	private Integer addressId;
	private Long voucherId;

	private List<Integer> orderDetailId;
}
