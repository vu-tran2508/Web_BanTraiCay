package com.edu.shop.model.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDto {

	private Long supplierId;

	private String name;
	
	private String nation;
	
	private String address;

	private String contactNumber;
	
	private String description;

}
