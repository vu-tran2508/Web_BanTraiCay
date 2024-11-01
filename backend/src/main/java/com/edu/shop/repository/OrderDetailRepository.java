package com.edu.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
	
	//    Viết truy vấn để lấy top 5 loại sản phẩm có lượt mua nhiều nhất
    @Query("SELECT od.product.category.name AS categoryName, SUM(od.quantity) AS totalQuantity " +
            "FROM OrderDetail od " +
            "GROUP BY od.product.category " +
            "ORDER BY totalQuantity DESC " +
            "LIMIT 5")
    List<Object[]> findTop5BestSellingCategories();

}
