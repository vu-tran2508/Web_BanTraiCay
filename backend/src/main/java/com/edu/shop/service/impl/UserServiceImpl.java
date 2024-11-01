package com.edu.shop.service.impl;

import java.util.HashSet;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edu.shop.domain.Role;
import com.edu.shop.domain.User;
import com.edu.shop.repository.RoleRespository;
import com.edu.shop.repository.UserRespository;
import com.edu.shop.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl  implements UserService{
	@Autowired
	private  UserRespository userrespository;
	
	@Autowired
	private RoleRespository roleRespository;
	
	   @Autowired
	 private JavaMailSender javaMailSender;
	
	private final PasswordEncoder passwordEncoder;

	@Override
	public User saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userrespository.save(user);
	}

	@Override
	public Role saveRole(Role role) {
		return roleRespository.save(role);
		
	
	}
	
	
	  @Override
	public String sendVerificationEmail(String  email) {
	        SimpleMailMessage mailMessage = new SimpleMailMessage();
	        String VerificationCode = generateVerificationCode();
	        mailMessage.setTo(email);
	        mailMessage.setSubject("Mã xác nhận");
	        mailMessage.setText("Mã xác minh của bạn là: " + VerificationCode);
	        javaMailSender.send(mailMessage);
	        return VerificationCode;
	    }
	  
	  private String generateVerificationCode() {
	        return UUID.randomUUID().toString().substring(0, 5).toUpperCase();
	    }

	  
	  
	@Override
	public void addToUser(String username, String roleName) {
		System.out.println("username: "+username +"ROLE: "+roleName);
		
		User user = userrespository.findByEmail(username).get();
		Role role =roleRespository.findByName(roleName);
		System.out.println("TIM THẤY "+user);
		System.out.println("TIM THẤY role "+role);
		 if (user.getRoles() == null) {
		        user.setRoles(new HashSet<>());
		    }

		user.getRoles().add(role);
		
	}


}