package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import com.edu.shop.domain.PayMent;

public interface PayMentService {

	void deleteAll();

	void delete(PayMent entity);

	PayMent getById(Integer id);

	void deleteById(Integer id);

	long count();

	PayMent getOne(Integer id);

	Optional<PayMent> findById(Integer id);

	List<PayMent> findAll();

	<S extends PayMent> S save(S entity);

}
