package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "addresses")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "addressId")
public class Address implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer addressId;
	@Column
	private Integer code;
	@Column(columnDefinition = "nvarchar(100) null")
	private String name;
	@Column(columnDefinition = "nvarchar(100) null")
	private String city;
	@Column(columnDefinition = "nvarchar(100) null")
	private String district;
	@Column(columnDefinition = "nvarchar(100) null")
	private String ward;
	@Column(columnDefinition = "nvarchar(100) null")
	private String streetNumber;

	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "customerId")
	private Customer customer;

	  @OneToMany(mappedBy = "address")
	  @JsonIgnore
	  private List<Order> orders;

}
