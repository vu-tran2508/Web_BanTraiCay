package com.edu.shop.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.edu.shop.auth.AuthenticationRequest;
import com.edu.shop.auth.AuthenticationRespose;
import com.edu.shop.domain.Role;
import com.edu.shop.domain.User;
import com.edu.shop.repository.RoleCustomRepo;
import com.edu.shop.repository.UserRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRespository userRespository;

	private final AuthenticationManager authenticationManager;

	private final RoleCustomRepo customRepo;

	private final JwtService jwtService;
	
	public AuthenticationRespose authenticate(AuthenticationRequest authenticationRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
				authenticationRequest.getPassword()));
		User user = userRespository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
		List<Role> roles = null;

		if (user != null) {
			roles = customRepo.getRoles(user);
		}
		
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		Set<Role> set = new HashSet<>();
		roles.stream().forEach(c -> set.add(new Role(c.getName())));

		user.setRoles(set);
		set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
		var jwtToken = jwtService.generateToken(user, authorities);
		var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
		return AuthenticationRespose.builder().accessToken(jwtToken).refreshToken(jwtRefreshToken).email(user.getUsername()).build();


	}

}