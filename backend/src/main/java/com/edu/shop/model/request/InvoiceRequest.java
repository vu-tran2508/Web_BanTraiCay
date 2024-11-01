package com.edu.shop.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceRequest {
	private Integer PayMentMethod;
    private String fullName;
    private String email;
    private String phone;
    private String note;
    private Double amont;
    
    private Integer addressId;
	private Integer code;
    private String city;
    private String district;
    private String ward;
    private String streetNumber;

    // getters and setters
}