package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customers")
public class Customer implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer customerId;

	@Column(length = 50)
	private String username;
	
	@Column(columnDefinition = "nvarchar(100) null")
	private String fullname;

	@Column(columnDefinition = "nvarchar(100) not null")
	private String email;

	@Column(length = 50)
	private String gender;

	@Column(length = 20)
	private String phone;

	@Column(length = 200)
	private String image;

	@Temporal(TemporalType.DATE)
	private Date dateOfBirth;

	@Temporal(TemporalType.DATE)
	private Date registeredDate;
	@Column
	private short status;
	
	
    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    @ToString.Exclude
    @JsonBackReference
    private User user;
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	@JsonBackReference
	private Set<Order> orders;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private Set<Address> address;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private Set<PostComment> comments;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private Set<ProductComment> productComments;
	
	

}