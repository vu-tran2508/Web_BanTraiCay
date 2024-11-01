package com.edu.shop.model.request;

import java.io.Serializable;


import lombok.Data;
@Data
public class PayMentRestDTO implements Serializable{
	private String message;
	private String Status;
	private String URL;
}
