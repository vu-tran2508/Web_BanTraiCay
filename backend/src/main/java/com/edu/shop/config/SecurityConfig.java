package com.edu.shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final AuthenticationProvider authenticationProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf().disable();  // Giữ lại một lần
		http.cors().and();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.authorizeRequests()
		        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
		        .requestMatchers(HttpMethod.PUT, "/api/**").permitAll()
		        .requestMatchers(HttpMethod.POST, "/api/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/admin/**").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/admin/**").permitAll()
				.requestMatchers(HttpMethod.PUT, "/api/admin/**").permitAll()
				.requestMatchers(HttpMethod.DELETE, "/api/admin/**").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/v1/auth/**").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/v1/auth/login").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/v1/auth/register").permitAll()
//				.requestMatchers(HttpMethod.POST,"/api/admin/customers").hasAnyAuthority("ROLE_STAFF","ROLE_ADMIN")
				.and()
				.csrf().disable()
				.authorizeRequests()
				.anyRequest()
				.authenticated().and().authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

}
