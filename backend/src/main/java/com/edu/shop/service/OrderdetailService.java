package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import com.edu.shop.domain.OrderDetail;

public interface OrderdetailService {

	void deleteAll();

	OrderDetail getById(Integer id);

	void deleteById(Integer id);

	long count();

	Optional<OrderDetail> findById(Integer id);

	List<OrderDetail> findAllById(Iterable<Integer> ids);

	<S extends OrderDetail> S save(S entity);

}
