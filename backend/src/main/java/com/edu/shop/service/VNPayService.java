package com.edu.shop.service;

import java.io.UnsupportedEncodingException;

import jakarta.servlet.http.HttpServletRequest;

public interface VNPayService {
	 String createPayment(Double amount,Integer orderId, HttpServletRequest req) throws UnsupportedEncodingException;
}
