package com.edu.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edu.shop.constants.OrderStatus;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Order;

@Repository
public interface OrderRepostory extends JpaRepository<Order, Integer> {

	List<Order> findByCustomer(Customer customer);
	List<Order> findByStatus(OrderStatus status);
	
	
	@Query("SELECT MONTH(o.orderDate) AS month, SUM(o.amount) AS totalAmount " +
	        "FROM Order o " +
	        "WHERE MONTH(o.orderDate) BETWEEN 1 AND 12 " +
	        "GROUP BY MONTH(o.orderDate)")
	List<Object[]> getMonthlyRevenue();
	
	
 

}
