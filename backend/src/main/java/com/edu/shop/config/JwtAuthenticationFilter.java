package com.edu.shop.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String SECRET_KEY = "123";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION); // Sử dụng HttpHeaders.AUTHORIZATION
        if(authorizationHeader !=null && authorizationHeader.startsWith("Bearer ")) {
        	try {
        		String token = authorizationHeader.substring("Bearer ".length()); // Thêm một khoảng trắng giữa "Bearer" và ".length()"
        		Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());
        		JWTVerifier verifier = JWT.require(algorithm).build();
        		DecodedJWT decodedJWT = verifier.verify(token);
        		String username =decodedJWT.getSubject();
        		String [] roles =decodedJWT.getClaim("roles").asArray(String.class);
        		
        		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        		Arrays.stream(roles).forEach(role ->{
//        			authorities.add(new SimpleGrantedAuthority(role));
//        			
//        		});
        		
        		Arrays.stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
        		System.out.println("VÀI TRÓ"+authorities);
        		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, null,authorities);
        		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				
        		filterChain.doFilter(request, response);
			} catch (Exception e) {
				response.setHeader("error", e.getMessage());
				response.setStatus(HttpStatus.FORBIDDEN.value());
				Map<String, String> error = new HashMap<>();
				error.put("error_message", e.getMessage());
	            response.setContentType(MediaType.APPLICATION_JSON_VALUE); // Set content type to JSON
	            new ObjectMapper().writeValue(response.getOutputStream(), error);
			}
        }else {
        	filterChain.doFilter(request, response);
        }
    }
}
