package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.shop.domain.OrderDetail;
import com.edu.shop.repository.OrderDetailRepository;
import com.edu.shop.service.OrderdetailService;

@Service
public class OrderdetailServiceImpl implements OrderdetailService{
	@Autowired
	OrderDetailRepository detailRepository;

	@Override
	public <S extends OrderDetail> S save(S entity) {
		return detailRepository.save(entity);
	}

	@Override
	public List<OrderDetail> findAllById(Iterable<Integer> ids) {
		return detailRepository.findAllById(ids);
	}

	@Override
	public Optional<OrderDetail> findById(Integer id) {
		return detailRepository.findById(id);
	}

	@Override
	public long count() {
		return detailRepository.count();
	}

	@Override
	public void deleteById(Integer id) {
		detailRepository.deleteById(id);
	}

	@Override
	public OrderDetail getById(Integer id) {
		return detailRepository.getById(id);
	}

	@Override
	public void deleteAll() {
		detailRepository.deleteAll();
	}
	
	
	

}
