package com.edu.shop.service;

import com.edu.shop.domain.Role;
import com.edu.shop.domain.User;

public interface UserService {
	
	User saveUser(User user);
	
	Role saveRole (Role role);
	
	void addToUser(String username , String roleName);

	String sendVerificationEmail(String  email);
	

}
