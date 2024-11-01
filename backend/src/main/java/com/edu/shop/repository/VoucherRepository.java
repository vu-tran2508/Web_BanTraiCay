package com.edu.shop.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.constants.VoucherStatus;
import com.edu.shop.domain.Voucher;
import java.util.List;


@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long>{
	List<Voucher> findByCode(String code);
	List<Voucher> findByStatus(VoucherStatus status);

}
