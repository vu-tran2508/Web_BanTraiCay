package com.edu.shop;

import java.util.HashSet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.edu.shop.config.StorageProperties;
import com.edu.shop.domain.Role;
import com.edu.shop.domain.User;
import com.edu.shop.service.StorageService;
import com.edu.shop.service.UserService;
@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
@EnableConfigurationProperties(StorageProperties.class)
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return(args ->{
			storageService.init();
			
		});
		
	}
//	@Bean
//	BCryptPasswordEncoder bCryptPasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//	
//	@Bean
//	CommandLineRunner run(UserService userService) {
//		return args ->{
//			userService.saveRole(new Role(null,"ROLE_USER"));
//			userService.saveRole(new Role(null,"ROLE_ADMIN"));
//			userService.saveRole(new Role(null,"ROLE_STAFF"));
//			
//			
//			userService.saveUser(new User(null,"hai@gmail.com","123",new HashSet<>()));
//			userService.saveUser(new User(null,"vu@gmail.com","123",new HashSet<>()));
//			userService.saveUser(new User(null,"haideptrai@gmail.com","123",new HashSet<>()));
//			
//			
//			userService.addToUser("hai@gmail.com", "ROLE_USER");
//			userService.addToUser("hai@gmail.com", "ROLE_ADMIN");
//			
//			userService.addToUser("vu@gmail.com", "ROLE_STAFF");
//			
//			userService.addToUser("haideptrai@gmail.com", "ROLE_USER");
//
//
//		};
//	}

}