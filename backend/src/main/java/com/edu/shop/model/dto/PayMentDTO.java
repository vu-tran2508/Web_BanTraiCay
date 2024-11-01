package com.edu.shop.model.dto;

import java.util.Date;

import com.edu.shop.constants.PaymentMethod;
import com.edu.shop.constants.PaymentStatus;

public class PayMentDTO {

	private Integer paymentId;

	private PaymentMethod PayMentMethod;

	private Date PaymentDate;

	private Float amount;

	private Date payDate;

	private Date Timestamp;

	private PaymentStatus paymentStatus;

	private Integer orderId;
}
