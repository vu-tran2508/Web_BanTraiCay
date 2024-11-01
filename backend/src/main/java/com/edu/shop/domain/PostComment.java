package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Date;

import com.edu.shop.constants.CommentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name = "postComments")
public class PostComment implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentId;
	
	@Column(columnDefinition = "nvarchar(200) not null")
	private String detail;
	
    @Enumerated(EnumType.STRING)
	private CommentStatus status;
    
	@Column(columnDefinition = "nvarchar(100) not null")
	private String images;
	
	@Temporal(TemporalType.DATE)
	private Date createDate;
	
    @Column
    private Integer likeCount;
    
    @Column
    private Integer dislikeCount;

	@Temporal(TemporalType.DATE)
	private Date updatedDate;

	@ManyToOne
	@JoinColumn(name = "postId")
	@JsonBackReference
	private Post post;

	@ManyToOne
	@JoinColumn(name = "customerId")
	@JsonBackReference
	private Customer customer;
}
