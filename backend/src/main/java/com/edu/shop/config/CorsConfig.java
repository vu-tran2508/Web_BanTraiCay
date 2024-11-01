package com.edu.shop.config;

//import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:3001", "http://localhost:3000")
	                .allowedMethods("GET", "POST", "PUT", "DELETE");
	    }
	}

//	@Bean
//	public CorsFilter corsFilter() {
//	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	    CorsConfiguration config = new CorsConfiguration();
//	    config.addAllowedOrigin("http://localhost:3000");
//	    config.addAllowedHeader("*");
//	    config.addAllowedMethod("GET");
//	    config.addAllowedMethod("POST");
//	    config.addAllowedMethod("PUT");
//	    config.addAllowedMethod("DELETE");
//
//	    source.registerCorsConfiguration("/**", config);
//	    return new CorsFilter((CorsConfigurationSource) source);
//	}

