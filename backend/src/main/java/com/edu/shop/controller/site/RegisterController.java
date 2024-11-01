package com.edu.shop.controller.site;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.auth.UserRegistrationRequest;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.User;
import com.edu.shop.repository.UserRespository;
import com.edu.shop.service.CustomerService;
import com.edu.shop.service.UserService;


@RestController
@RequestMapping("/api/user")
public class RegisterController {

	@Autowired
	CustomerService customerService;
	
	
	@Autowired
	UserService userService;
	@Autowired
	UserRespository respository;
	
	
	

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
	    try {
	        User user = new User();
	        user.setEmail(registrationRequest.getEmail());
	        user.setPassword(registrationRequest.getPassword());
	        User userSave = userService.saveUser(user);
	        userService.addToUser(userSave.getEmail(), "ROLE_USER");

	        // Save customer information
	        Customer entity = new Customer();
	        BeanUtils.copyProperties(registrationRequest, entity);
	        Date currentDate = new Date();
	        entity.setRegisteredDate(currentDate);
	        
	        entity.setUser(userSave);
	        short status = 0;
	        entity.setStatus(status);
	        Customer savedCustomer = customerService.save(entity);

	        return ResponseEntity.ok("Registration successful");
	    } catch (Exception e) {
	        // Log the exception for debugging purposes
	        e.printStackTrace();

	        // Return an error response
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Registration failed. Please try again.");
	    }
	}  
	
	static String VerificationCode=null;
	
	@GetMapping("/verify/{verificationCode}")
	public ResponseEntity<String> verifyAccount(@PathVariable String verificationCode) {
		System.out.println("MÃ XÁC MINH"+VerificationCode);
	    if (VerificationCode != null && VerificationCode.equals(verificationCode)) {
	        return ResponseEntity.ok("Tài khoản đã được xác minh thành công.");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .body("Mã xác minh không hợp lệ");
	    }
	}

	@GetMapping("/send/{email}")
	public ResponseEntity<String> sendEmail(@PathVariable String email) {
	    Optional<User> user = respository.findByEmail(email);
	    
	    if (user.isPresent()) {
	        System.out.println("EMAIL ĐÃ TON TẠI");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("Email đã tồn tại");
	
	    } else {
	        try {
	            System.out.println("EMAIL ĐÃ GỬI");
	            String verificationCode = userService.sendVerificationEmail(email);
	            VerificationCode=verificationCode;
	            return ResponseEntity.ok("Mã xác nhận đã gửi về email bạn");
	        } catch (IllegalArgumentException e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Invalid verification code");
	        }
	    }
	}

	
	
	


}
