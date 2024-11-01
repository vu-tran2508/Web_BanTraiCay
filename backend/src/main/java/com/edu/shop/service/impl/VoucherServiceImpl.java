package com.edu.shop.service.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.edu.shop.constants.VoucherStatus;
import com.edu.shop.domain.Voucher;
import com.edu.shop.repository.VoucherRepository;
import com.edu.shop.service.VoucherService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class VoucherServiceImpl implements VoucherService {
    private final VoucherRepository voucherRepository;

    @Autowired
    public VoucherServiceImpl(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }
    
//    @Scheduled(fixedDelay = 86400000) // Chạy mỗi 24 giờ (1 ngày)
//    public void checkAndExpireVouchers() {
//        List<Voucher> vouchers = voucherRepository.findByStatus(VoucherStatus.ACTIVE);
//        vouchers.forEach(Voucher::checkAndExpire);
//        voucherRepository.saveAll(vouchers);
//    }
//    
    
    
    
    @Override
	public List<Voucher> findByStatus(VoucherStatus status) {
		return voucherRepository.findByStatus(status);
	}

	@Override
	public Voucher updateVoucher(Long id, Voucher updatedVoucher) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher existingVoucher = optionalVoucher.get();
            // Thực hiện cập nhật các trường của voucher với dữ liệu từ updatedVoucher
            // ...

            return voucherRepository.save(existingVoucher);
        } else {
            return null;
        }
    }
    @Override
    public Voucher saveVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher getVoucherById(Long id) {
        return voucherRepository.findById(id).orElse(null);
    }
    

    @Override
	public List<Voucher> findByCode(String code) {
		return voucherRepository.findByCode(code);
	}

	@Override
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @Override
    public void deleteVoucher(Long id) {
        voucherRepository.deleteById(id);
    }
}