package com.edu.shop.controller.admin;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.domain.Voucher;
import com.edu.shop.service.VoucherService;

@RestController
@RequestMapping("/api/admin/vouchers")
@CrossOrigin(origins = "http://localhost:3000")
public class VoucherRestController {
	 @Autowired
	 VoucherService voucherService;
	 
	  @GetMapping
	    public ResponseEntity<List<Voucher>> getAllVouchers() {
	        List<Voucher> vouchers = voucherService.getAllVouchers();
	        return ResponseEntity.ok(vouchers);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Voucher> getVoucherById(@PathVariable Long id) {
	        Voucher voucher = voucherService.getVoucherById(id);
	        if (voucher != null) {
	            return ResponseEntity.ok(voucher);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @PostMapping
	    public ResponseEntity<Voucher> createVoucher(@RequestBody Voucher voucher) {
	        Voucher createdVoucher = voucherService.saveVoucher(voucher);
	        return ResponseEntity.ok(createdVoucher);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Voucher> updateVoucher(@PathVariable Long id, @RequestBody Voucher voucher) {
	        Voucher updatedVoucher = voucherService.updateVoucher(id, voucher);
	        if (updatedVoucher != null) {
	            return ResponseEntity.ok(updatedVoucher);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteVoucher(@PathVariable Long id) {
	        voucherService.deleteVoucher(id);
	        return ResponseEntity.noContent().build();
	    }
}
