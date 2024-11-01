package com.edu.shop.controller.site;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.constants.OrderStatus;
import com.edu.shop.constants.PaymentStatus;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Order;
import com.edu.shop.domain.PayMent;
import com.edu.shop.model.request.CartItemsRequest;
import com.edu.shop.model.request.InvoiceRequest;
import com.edu.shop.model.request.OrderRequest;
import com.edu.shop.service.OrderService;
import com.edu.shop.service.PayMentService;
import com.edu.shop.service.VNPayService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:3001")
public class OrderSiteRestController {

	@Autowired
	private VNPayService vnPayService;

	@Autowired
	private OrderService orderService;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	PayMentService mentService;

	@PostMapping("/cart/createInvoice")
	public ResponseEntity<Object> createInvoice(@RequestBody Map<String, Object> orderRequestMap)
			throws UnsupportedEncodingException {
		OrderRequest orderRequest = new ObjectMapper().convertValue(orderRequestMap, OrderRequest.class);

		System.out.println("HOA DON---" + orderRequest.getInvoiceRequest());
		CartItemsRequest[] cartItems = orderRequest.getCartItemsRequest();
		Order ordersave;
		String redirectUrl = "";

		if (orderRequest.getInvoiceRequest().getPayMentMethod() == 1) {
			// Xử lý khi sử dụng phương thức thanh toán bằng tiền mặt
			ordersave = orderService.createOrder(orderRequest.getCartItemsRequest(), orderRequest.getInvoiceRequest());
			PayMent ment = ordersave.getPayMent();
			Optional<PayMent> ment2 = mentService.findById(ment.getPaymentId());
			ment2.get().setPaymentStatus(PaymentStatus.UNPAID);
			ment2.get().setOrder(ordersave);
			mentService.save(ment2.get());
			// Trả về ID của hóa đơn
			return ResponseEntity.ok().body(Map.of("id", ordersave.getOrderId()));
		} else if (orderRequest.getInvoiceRequest().getPayMentMethod() == 2) {
			// Xử lý khi sử dụng phương thức thanh toán qua VNPay
			ordersave = orderService.createOrder(orderRequest.getCartItemsRequest(), orderRequest.getInvoiceRequest());
			Integer orderId =ordersave.getOrderId();
			redirectUrl = vnPayService.createPayment(orderRequest.getInvoiceRequest().getAmont(),orderId, request);
			PayMent ment = ordersave.getPayMent();
			Optional<PayMent> ment2 = mentService.findById(ment.getPaymentId());
			ment2.get().setPaymentStatus(PaymentStatus.PAID);
			ment2.get().setOrder(ordersave);
			mentService.save(ment2.get());
			// Trả về URL thanh toán
			return ResponseEntity.ok().body(Map.of("url", redirectUrl));
		} else {
			return ResponseEntity.badRequest().body(
					"Phương thức thanh toán không được hỗ trợ: " + orderRequest.getInvoiceRequest().getPayMentMethod());
		}
	}

	@GetMapping("/filterByCustomer/{customerId}")
	public ResponseEntity<List<Order>> filterOrdersByCustomer(@PathVariable Integer customerId) {

		// Sử dụng OrderRepository để lấy danh sách đơn hàng dựa trên khách hàng
		Customer customer = new Customer();
		customer.setCustomerId(customerId);
		List<Order> filteredOrders = orderService.findByCustomer(customer);

		// Trả về danh sách đơn hàng đã lọc theo khách hàng
		return ResponseEntity.ok(filteredOrders);
	}

	@GetMapping("getOrder/{orderId}")
	public ResponseEntity<Order> getOrderById(@PathVariable Integer orderId) {
		Optional<Order> optional = orderService.findById(orderId);
		// Trả về danh sách đơn hàng đã lọc theo khách hàng
		return ResponseEntity.ok(optional.get());
	}

	@GetMapping("/filterByStatus")
	public ResponseEntity<List<Order>> filterOrdersByStatus(@RequestParam(name = "status") OrderStatus status) {
		List<Order> filteredOrders = orderService.findByStatus(status);
		return ResponseEntity.ok(filteredOrders);
	}

	@GetMapping("/complete/{orderId}")
	public ResponseEntity<String> acknowledgeReceipt(@PathVariable("orderId") Integer orderId) {
		System.out.println("ID CỦA ĐƠN HÀNG"+orderId);
		try {
			orderService.updateOrderStatus(orderId, "COMPLETED");
			return new ResponseEntity<>("đơn hàng đã xác nhận thành công", HttpStatus.OK);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Đã xảy ra lỗi khi xử lý yêu cầu", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
