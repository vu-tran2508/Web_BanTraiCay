package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.edu.shop.constants.OrderStatus;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Order;
import com.edu.shop.model.request.CartItemsRequest;
import com.edu.shop.model.request.InvoiceRequest;

import jakarta.transaction.Transactional;

public interface OrderService {

	void deleteAll();

	void delete(Order entity);

	Order getById(Integer id);

	void deleteById(Integer id);

	long count();

	Order getOne(Integer id);

	void deleteAllInBatch();

	boolean existsById(Integer id);

	Optional<Order> findById(Integer id);

	List<Order> findAll();

	Page<Order> findAll(Pageable pageable);

	void flush();

	List<Order> findAll(Sort sort);

	<S extends Order> Optional<S> findOne(Example<S> example);

	<S extends Order> S save(S entity);

	Order createOrder(CartItemsRequest[] cartItemsRequest, InvoiceRequest invoiceRequest);

	List<Order> findByStatus(OrderStatus status);

	List<Order> findByCustomer(Customer customer);

	void cancelOrder(Integer orderId, String reason) throws RuntimeException;

	void updateOrderStatus(Integer orderId, String newStatus) throws RuntimeException;

}
