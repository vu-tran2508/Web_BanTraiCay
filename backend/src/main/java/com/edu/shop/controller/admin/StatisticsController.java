package com.edu.shop.controller.admin;
import com.edu.shop.domain.Order;
import com.edu.shop.service.CustomerService;
import com.edu.shop.service.OrderService;
import com.edu.shop.service.ProductService;
import com.edu.shop.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/statistics")
public class StatisticsController {

	    @Autowired
	    private StatisticsService statisticsService;
	    
	    @Autowired
	    private OrderService orderService;
	    
	    @Autowired
	    private CustomerService  customerService;
	    
	    @Autowired
	    private ProductService  productService;


    @GetMapping("/monthly-revenue")
    public Map<String, Double> getMonthlyRevenue() {
        return statisticsService.getMonthlyRevenue();
    }

    @GetMapping("/yearly-revenue")
    public Map<Integer, Double> getYearlyRevenue() {
        return statisticsService.getYearlyRevenue();
    }

    @GetMapping("/top-selling-categories")
    public List<Object[]>  getTopSellingCategories() {
        return statisticsService.getTop5BestSellingCategories();
    }

    @GetMapping("/total-revenue")
    public Double getTotalRevenue() {
        return statisticsService.getTotalRevenue();
    }
    @GetMapping("/total-order")
    public Integer getTotalOrder() {
        return orderService.findAll().size();
    }
    @GetMapping("/total-product")
    public Integer getTotalProducts() {
        return productService.findAll().size();
    }
    @GetMapping("/total-Custoemr")
    public Integer getTotalCustomer() {
        return customerService.findAll().size();
    }
}
