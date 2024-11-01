package com.edu.shop.auth;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserRegistrationRequest {
        
		private String email;
		private String password;
		private String username;
		private String fullname;
		
		private String gender;
		
		private String phone;
		
	   @DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date dateOfBirth;
		

	

}
