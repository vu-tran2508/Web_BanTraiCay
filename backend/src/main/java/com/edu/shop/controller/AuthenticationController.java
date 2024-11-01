package com.edu.shop.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.auth.AuthenticationRequest;
import com.edu.shop.auth.AuthenticationRespose;
import com.edu.shop.domain.Account;
import com.edu.shop.domain.Customer;
import com.edu.shop.model.dto.AccountDTO;
import com.edu.shop.service.AccountService;
import com.edu.shop.service.AuthenticationService;
import com.edu.shop.service.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthenticationController {
	@Autowired
	AccountService accountService;
	
	@Autowired
	CustomerService customerService;
	
	 private final AuthenticationService authenticationService;
	 
		
		
	@PostMapping("/login")
	public ResponseEntity<AuthenticationRespose> login(@RequestBody AuthenticationRequest authenticationRequest){
		System.out.println("DỮ LIỆU GỬI :  "+authenticationRequest);
		
		System.out.println("DỮ LIỆU GỬI :  "+authenticationService.authenticate(authenticationRequest));
		return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
		
	}
	
	@GetMapping("/account/{email}")
	public ResponseEntity<Account> getAccountByEmail(@PathVariable String email) {
	    try {
	        System.out.println("Email: " + email);

	        // Sử dụng method findByEmail để lấy thông tin tài khoản
	        Optional<Account> optionalAccount = accountService.findByEmail(email);

	        if (optionalAccount.isPresent()) {
	            Account account = optionalAccount.get();
	            System.out.println("DATA SENT: " + account);
	            return ResponseEntity.ok(account);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (Exception e) {
	        // Xử lý các ngoại lệ một cách phù hợp (ví dụ: ghi log lỗi)
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	@GetMapping("/customer/{email}")
	public ResponseEntity<Customer> getCustomerByEmail(@PathVariable String email) {
	    try {
	        System.out.println("Email: " + email);

	        // Sử dụng method findByEmail để lấy thông tin tài khoản
	        Optional<Customer> optional = customerService.findByEmail(email);

	        if (optional.isPresent()) {
	        	Customer customer = optional.get();
	            System.out.println("DATA SENT: " + customer);
	            return ResponseEntity.ok(customer);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (Exception e) {
	        // Xử lý các ngoại lệ một cách phù hợp (ví dụ: ghi log lỗi)
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}





}
