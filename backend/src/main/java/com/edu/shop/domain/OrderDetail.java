package com.edu.shop.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "OrderDetails")
@JsonIgnoreProperties({ "order" }) // Thêm vào đây các trường gây vòng lặp vô hạn
public class OrderDetail implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer orderDetailId;

	@Column(columnDefinition = "nvarchar(100) null")
	private String name;

	private Double discount;

	@Column(nullable = false)
	private Integer quantity;

	@Column(nullable = false)
	private Double unitPrice;

	@ManyToOne
	@JoinColumn(name = "productId")
	@JsonManagedReference
	private Product product;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonBackReference
	@JoinColumn(name = "orderId")
	private Order order;
}
