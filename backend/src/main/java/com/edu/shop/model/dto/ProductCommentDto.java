package com.edu.shop.model.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCommentDto {

	private Integer commentId;

	private String detail;

	private Integer starRating;

	private Date createDate;

	private Date updatedDate;

	private Integer customerId;

	private Integer productId;
}