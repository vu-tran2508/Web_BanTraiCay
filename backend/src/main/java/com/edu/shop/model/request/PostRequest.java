package com.edu.shop.model.request;

import com.edu.shop.constants.PostStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
	
	
	private String name;

	private String description;

	private String metaKeywords;
	
	private String metaDescription;
	
	private PostStatus status;
	
	private String emailAccount;

	private Long tagId;


}
