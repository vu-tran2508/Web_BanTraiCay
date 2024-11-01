package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "suppliers")
public class Supplier implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long supplierId;
	@Column(columnDefinition = "nvarchar(100) null")
	private String name;
	@Column(columnDefinition = "nvarchar(100) null")
	private String address;

	@Column(columnDefinition = "nvarchar(100) null")
	private String Nation;
	
	private String logo;

	@Column(length = 13)
	private String contactNumber;
	
	@Column(columnDefinition = "nvarchar(500) null")
	private String description;

	@OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
	@JsonBackReference
	private Set<Product> products;

	// Constructors, getters, and setters
}
