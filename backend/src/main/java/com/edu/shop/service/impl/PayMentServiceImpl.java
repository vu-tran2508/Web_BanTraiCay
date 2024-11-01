package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.shop.domain.PayMent;
import com.edu.shop.repository.PayMentRepostory;
import com.edu.shop.service.PayMentService;

@Service
public class PayMentServiceImpl implements PayMentService{
	
	@Autowired
	PayMentRepostory mentRepostory;

	@Override
	public <S extends PayMent> S save(S entity) {
		return mentRepostory.save(entity);
	}

	@Override
	public List<PayMent> findAll() {
		return mentRepostory.findAll();
	}

	@Override
	public Optional<PayMent> findById(Integer id) {
		return mentRepostory.findById(id);
	}

	@Override
	public PayMent getOne(Integer id) {
		return mentRepostory.getOne(id);
	}

	@Override
	public long count() {
		return mentRepostory.count();
	}

	@Override
	public void deleteById(Integer id) {
		mentRepostory.deleteById(id);
	}

	@Override
	public PayMent getById(Integer id) {
		return mentRepostory.getById(id);
	}

	@Override
	public void delete(PayMent entity) {
		mentRepostory.delete(entity);
	}

	@Override
	public void deleteAll() {
		mentRepostory.deleteAll();
	}
	
	
	

}
