package com.edu.shop.controller.admin;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.edu.shop.constants.OrderStatus;
import com.edu.shop.domain.Order;
import com.edu.shop.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderRestController {

    public static final short PENDING = 0;
    public static final short CONFIRMED = 1;
    public static final short COMPLETED = 2;

    @Autowired
    OrderService orderService;

    @GetMapping("/confirmation")
    public ResponseEntity<List<Order>> getPendingOrders() {
        List<Order> orders = findOrdersByStatus(PENDING);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/shipping")
    public ResponseEntity<List<Order>> getConfirmedOrders() {
        List<Order> orders = findOrdersByStatus(CONFIRMED);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrders(@PathVariable Integer orderId) {
        Optional<Order> orders = orderService.findById(orderId);
        return ResponseEntity.ok(orders.get());
    }
    
    
    @GetMapping("")
    public ResponseEntity<List<Order>> findAll() {
        List<Order> orders = orderService.findAll();
        return ResponseEntity.ok(orders);
    }

    
    @GetMapping("/status") // lấy hóa đơn theo 2 trang thái
    public ResponseEntity<List<Order>> getOrderStatus() {
        List<Order> list = new ArrayList<>();

        List<Order> orders1 = orderService.findByStatus(OrderStatus.WAITING);
        list.addAll(orders1);

        List<Order> orders2 = orderService.findByStatus(OrderStatus.CONFIRMED);
        list.addAll(orders2);
        return ResponseEntity.ok(list);
    }

    
    
    @PostMapping("/update-status/{orderId}")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestParam String newStatus) {
        try {
            // Gọi service để cập nhật trạng thái đơn hàng với orderId và newStatus
            orderService.updateOrderStatus(orderId, newStatus);
            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi cập nhật trạng thái đơn hàng");
        }
    }
    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(
    	    @PathVariable("orderId") Integer orderId,
            @RequestParam("reason") String reason
        
    ) {
        try {
            orderService.cancelOrder(orderId, reason);
            return new ResponseEntity<>("Đã hủy đơn hàng thành công", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Đã xảy ra lỗi khi xử lý yêu cầu", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/page")
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam("page") Optional<Integer> page,
                                                    @RequestParam("size") Optional<Integer> size) {
        int currentPage = page.orElse(0).intValue();
        int pageSize = size.orElse(5).intValue();
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        Page<Order> resultPage = orderService.findAll(pageable);

        if (resultPage != null) {
            List<Order> orders = resultPage.getContent();
            return ResponseEntity.ok(orders);
        } else {
            // Xử lý khi resultPage là null, ví dụ: ném một ngoại lệ hoặc trả về thông báo lỗi
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmOrder(@RequestParam("orderId") Integer orderId,
                                              @RequestParam("inputState") Short selectedStatus) {
        return updateOrderStatus(orderId, selectedStatus);
    }

    @PostMapping("/ship")
    public ResponseEntity<String> shipOrder(@RequestParam("orderId") Integer orderId,
                                           @RequestParam("inputState") Short selectedStatus) {
        return updateOrderStatus(orderId, selectedStatus);
    }

    private ResponseEntity<String> updateOrderStatus(Integer orderId, Short selectedStatus) {
        Optional<Order> opt = orderService.findById(orderId);

        if (opt.isPresent()) {
            Order order = opt.get();

            switch (selectedStatus) {
                case 2:
                    order.setStatus(OrderStatus.CONFIRMED);
                    break;
                case 3:
                    order.setStatus(OrderStatus.COMPLETED);
                    break;
                case 4:
                    order.setStatus(OrderStatus.CANCELLED);
                    break;
                default:
                    // Xử lý trạng thái không hợp lệ (nếu cần)
                    return ResponseEntity.badRequest().body("Trạng thái không hợp lệ: " + selectedStatus);
            }

            orderService.save(order);
            return ResponseEntity.ok("Đơn hàng đã được cập nhật.");
        }

        return ResponseEntity.notFound().build();
    }

    private List<Order> findOrdersByStatus(short status) {
        List<Order> orders = orderService.findAll();
        return orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.COMPLETED)
                .collect(Collectors.toList());
    }
}