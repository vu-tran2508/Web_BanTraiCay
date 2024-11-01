package com.edu.shop.model.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerDto {
	private int customerId;

	private String username;

	private String fullname;

	private String email;

	private String gender;

	private String password;

	private String phone;

	private String image;
	
   @DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dateOfBirth;

	private Date registeredDate;

	private short status;
	
	@Override
    public String toString() {
        return "CustomerDto{" +
                "customerId='" + customerId + '\'' +
                ", username='" + username + '\'' +
                ", fullname='" + fullname + '\'' +
                ", email='" + email + '\'' +
                ", gender='" + gender + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", registeredDate=" + registeredDate +
                ", status='" + status + '\'' +
                '}';
    }

}
