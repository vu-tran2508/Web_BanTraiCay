package com.edu.shop.domain;

import java.io.Serializable;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.edu.shop.constants.PostStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "posts")
public class Post implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer postId;
	@Column(columnDefinition = "nvarchar(200) not null")
	private String name;
	@Column(columnDefinition = "nvarchar(100) null")
	private String image;
	@Column(columnDefinition = "nvarchar(max) not null")
	private String description;
	@Column(columnDefinition = "nvarchar(200) not null")
	private String metaKeywords;
	@Column(columnDefinition = "nvarchar(1000) not null")
	private String metaDescription;
	
    @Enumerated(EnumType.STRING)
	private PostStatus status;
	
	
	@Column(length = 10000)
	private Integer viewCount;
	@Temporal(TemporalType.DATE)
	private Date createDate;
	@Temporal(TemporalType.DATE)
	private Date updateDate;
    @Column
    private Integer likeCount;
    @Column
    private Integer dislikeCount;

    @ManyToOne
    @JoinColumn(name = "accountId")
    @JsonManagedReference
    private Account account;
	
	@ManyToOne
	@JoinColumn(name = "tag_id")
	@JsonManagedReference
	private Tag tag;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<PostComment> postComments;
	
	
	
	@JsonIgnore
	public Account getAccount() {
		return account;
	}

}
