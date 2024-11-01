
package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Date;

import com.edu.shop.constants.CommentStatus;
import com.edu.shop.constants.PostStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ProductComments")
public class ProductComment implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer commentId;
	@Column(columnDefinition = "nvarchar(200) not null")
	private String detail;
    @Enumerated(EnumType.STRING)
	private CommentStatus status;
    
	@Column
	private Integer starRating;
	   
	@Temporal(TemporalType.DATE)
	private Date createDate;

	@Temporal(TemporalType.DATE)
	private Date updatedDate;

	@ManyToOne
	@JoinColumn(name = "customerId")
	
	private Customer customer;
	
	@ManyToOne
    @JoinColumn(name = "productId") // Name of the foreign key column in the ProductComment table
	 @JsonBackReference
    private Product product;
}
