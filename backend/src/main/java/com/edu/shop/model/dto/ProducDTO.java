package com.edu.shop.model.dto;

import java.util.Date;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.constants.ProductUnit;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProducDTO {


	private String name;

	private Integer quantity;

	private Double salePrice;

	private Double importPrice;

	private String image;

	private String description;

	private Double discount;

	private Double discountType;

	private Date enterdDate;

	private Date UpdateDate;

	private Date hotEndDate;

	private Integer ViewCount;

	private String metaTitle;

	private String metaKeywords;

	private String metaDescription;

	private Short status;

	private ProductUnit unit; // Đơn vị sản phẩm, sử dụng Enum ProductUnit

	private Long supplierId;

	private Long accountId;

	private Long categoryId;

}
