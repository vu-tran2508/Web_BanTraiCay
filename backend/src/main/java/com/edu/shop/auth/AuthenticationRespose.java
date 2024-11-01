package com.edu.shop.auth;

import java.util.Collection;

import com.edu.shop.domain.Account;
import com.edu.shop.model.dto.CustomerDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRespose {
	
	private String accessToken;
	private String refreshToken;
    private String email;
    


}
