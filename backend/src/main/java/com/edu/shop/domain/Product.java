package com.edu.shop.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.edu.shop.constants.ProductUnit;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name = "products")
public class Product implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;
	@Column(columnDefinition = "nvarchar(100) not null")
	private String name;
	@Column(nullable = false)
	private Integer quantity;
	@Column(nullable = false)
	private Double salePrice;	
	@Column(nullable = false)
	private Double importPrice;
	@Column(length = 200)
	private String image;
	@Column(columnDefinition = "nvarchar(max) null")
	private String description;	
	@Column(nullable = true)
	private Double discount;	
	@Column(nullable = true)
	private Double discountType;
	@Temporal(TemporalType.DATE)
	private Date enterdDate;
	@Temporal(TemporalType.DATE)
	private Date UpdateDate;
	@Temporal(TemporalType.DATE)
	private Date hotEndDate;
    @Column
	private Integer ViewCount;
    @Column
	private Integer starRating;
	@Column(columnDefinition = "nvarchar(100)")
	private String metaTitle;	
	@Column(columnDefinition = "nvarchar(100)")
	private String metaKeywords;	
	@Column(columnDefinition = "nvarchar(100)")
	private String metaDescription;
	@Column(nullable = true)
	private Short status;
	@Enumerated(EnumType.STRING)
	@Column(length = 4) // Độ dài tối đa của Enum (ví dụ: "GOI", "KG", "CAI")
	private ProductUnit unit; // Đơn vị sản phẩm, sử dụng Enum ProductUnit
	
	@ManyToOne
	@JoinColumn(name = "supplierId")
	@JsonManagedReference
	private Supplier supplier;
	

	@ManyToOne
	@JoinColumn(name = "accountId")
	@JsonBackReference
	private Account account;
	
	@ManyToOne
	@JoinColumn(name = "categoryId")
	@JsonManagedReference
	private Category category;
	
	
	   @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    @JsonManagedReference
	private List<ProductImage>  images;

	
  
	@OneToMany(mappedBy = "product")
	@JsonBackReference
	private Set<OrderDetail> orderDetails;
	

	

    
    @ToString.Exclude
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductComment> comments;

    
    
    @JsonIgnore
    public List<ProductImage> getImages() {
        return images;
    }

}
