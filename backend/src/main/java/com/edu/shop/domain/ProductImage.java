package com.edu.shop.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_images")
public class ProductImage implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int imageId;

	@Column(nullable = false)
	private String imageUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productId")
	@JsonBackReference
	private Product product;

	// Các getter và setter
	
	@Override
	public String toString() {
	    return "ProductImage{" +
	            "imageId=" + imageId +
	            ", imageUrl='" + imageUrl + '\'' +
	            ", otherFields=..." + // 
	            '}';
	}

}