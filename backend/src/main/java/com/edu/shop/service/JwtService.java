package com.edu.shop.service;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.edu.shop.domain.User;


@Service
public class JwtService {
	
	private static final String SECRET_KEY = "123";
	private static final long EXPIRATION_TIME_MS = 50 * 60 * 1000;
	private static final long EXPIRATION_TIME = 70 * 60 * 1000;
	public String  generateToken(User user,
			Collection<SimpleGrantedAuthority> authorities) {
		
		Algorithm algorithm =Algorithm.HMAC256(SECRET_KEY.getBytes());
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
				.withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
		
	}
	
	public String  generateRefreshToken(User user,
			Collection<SimpleGrantedAuthority> authorities) {
		
		Algorithm algorithm =Algorithm.HMAC256(SECRET_KEY.getBytes());
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.sign(algorithm);
		
	}
	

}
