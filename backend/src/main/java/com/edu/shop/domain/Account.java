package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.edu.shop.constants.AccountStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
@Table(name = "accounts")
public class Account implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer accountId;

	@Column(length = 30)
	private String username;

	@Column(columnDefinition = "nvarchar(100) null")
	private String email;

	@Column(columnDefinition = "nvarchar(100) not null")
	private String fullname;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private AccountStatus status;

	@Column(length = 200)
	private String image;

	@Temporal(TemporalType.DATE)
	private Date birthday;

	@Temporal(TemporalType.DATE)
	private Date createDate;

	@Temporal(TemporalType.DATE)
	private Date updateDate;

	@Column(length = 200)
	private String phone;

	@Column(length = 50)
	private String gender;
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "user_id", unique = true, nullable = false)
	@ToString.Exclude
	private User user;

	@ToString.Exclude
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Product> products;


	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Post> posts;

	@Override
	public int hashCode() {
		return Objects.hash(accountId, username, email, fullname);
	}

	@JsonIgnore
	public List<Product> getProduct() {
		return products;
	}
	
	@JsonIgnore
	public List<Post> getPost() {
		return posts;
	}
	
	@Override
	public String toString() {
	    return "Account{" +
	            "accountId=" + accountId +
	            ", username='" + username + '\'' +
	            // other fields...
	            '}';
	}


}