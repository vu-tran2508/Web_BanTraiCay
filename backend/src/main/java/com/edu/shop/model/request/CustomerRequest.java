package com.edu.shop.model.request;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.edu.shop.model.dto.AddressDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
	

	private String username;

	private String fullname;

	private String gender;
	
	private String phone;
	
   @DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dateOfBirth;

}
