package com.edu.shop.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddressDTO {

	private Integer addressId;
	
	private Integer code;
	
	private String name;
	
	private String city;

	private String district;

	private String ward;

	private String streetNumber;

	private Integer customerId;

}
