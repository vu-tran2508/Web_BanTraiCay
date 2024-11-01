package com.edu.shop.domain;

import java.io.Serializable;
import java.time.LocalDate;

import com.edu.shop.constants.VoucherStatus;
import com.edu.shop.constants.VoucherType;

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
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vouchers")
public class Voucher implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long voucherId;
	@Column(nullable = true)
	private String code;
	@Column(columnDefinition = "nvarchar(100) not null")
	private String name;
	@Column(nullable = true)
	private Double discountAmount;
	
	 @Enumerated(EnumType.STRING)
	 private VoucherType voucherType;
	 
	@Column(columnDefinition = "nvarchar(100)")
	@Temporal(TemporalType.DATE)
	private LocalDate startTime;
	
	@Temporal(TemporalType.DATE)
	private LocalDate endTime;
	
	@Enumerated(EnumType.STRING)
	private VoucherStatus status;
	
	@Column(columnDefinition = "TEXT")
	private String Desciption;
	
	@Column(nullable = true)
	private Integer usageLimit;
	
	
//	   @Transient
//	    private boolean checkedAndExpired = false;
//
//	    public void checkAndExpire() {
//	        if (!checkedAndExpired && status == VoucherStatus.ACTIVE && endTime.isBefore(LocalDate.now())) {
//	            // Nếu trạng thái là ACTIVE và thời gian kết thúc trước thời điểm hiện tại
//	            // Cập nhật trạng thái thành EXPIRED
//	            status = VoucherStatus.EXPIRED;
//	            checkedAndExpired = true;
//	        }
//	    }

}