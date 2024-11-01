package com.edu.shop.service;

import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.shop.domain.Order;
import com.edu.shop.domain.OrderDetail;
import com.edu.shop.repository.OrderDetailRepository;
import com.edu.shop.repository.OrderRepostory;

@Service
public class StatisticsService {
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	OrderRepostory orderRepostory;
	
	@Autowired
	OrderDetailRepository detailRepository;
	


	
	public Map<String, Double> getMonthlyRevenue() {
	    List<Object[]> results = orderRepostory.getMonthlyRevenue();

	    Map<String, Double> monthlyRevenue = new HashMap<>();

	    for (Object[] result : results) {
	        int month = (int) result[0];
	        String monthName = Month.of(month).name();
	        double totalAmount = (double) result[1];

	        monthlyRevenue.put(monthName, totalAmount);
	    }

	    // Bổ sung các tháng không có dữ liệu
	    for (int i = 1; i <= 12; i++) {
	        String monthName = Month.of(i).name();
	        monthlyRevenue.putIfAbsent(monthName, 0.0);
	    }

	    return monthlyRevenue;
	}


	public Map<Integer, Double> getYearlyRevenue() {
        List<Order> orders = orderService.findAll();
        Map<Integer, Double> yearlyRevenue = new HashMap<>();

        for (Order order : orders) {
            LocalDate orderDate = order.getOrderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            int year = orderDate.getYear();

            // Summing up the revenue for each year
            yearlyRevenue.merge(year, order.getAmount(), Double::sum);
        }

        return yearlyRevenue;
    }
	
	
	 public List<Object[]> getTop5BestSellingCategories() {
	        return detailRepository.findTop5BestSellingCategories();
	    }

	
	 public Double getTotalRevenue() {
	        List<Order> orders = orderService.findAll();
	        return orders.stream().mapToDouble(Order::getAmount).sum();
	    }

}
