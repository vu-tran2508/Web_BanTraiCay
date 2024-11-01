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
@Table(name = "Categories")
public class Category implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;

	@Column(name = "category_name", length = 100, columnDefinition = "nvarchar(100) not null")
	private String name;
	@Column(name = "category_slug", length = 100, columnDefinition = "nvarchar(100)")
	private String slug;

	@Column(columnDefinition = "nvarchar(200) null")
	private String description;

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	@JsonBackReference
	private Set<Product> products;

}