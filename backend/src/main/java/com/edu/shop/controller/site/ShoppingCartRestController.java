//package com.edu.shop.controller.site;
//
//import java.io.UnsupportedEncodingException;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.edu.shop.domain.Customer;
//import com.edu.shop.domain.Order;
//import com.edu.shop.domain.OrderDetail;
//import com.edu.shop.domain.Product;
//import com.edu.shop.model.request.CartItemsRequest;
//import com.edu.shop.model.request.InvoiceRequest;
//import com.edu.shop.service.CustomerService;
//import com.edu.shop.service.OrderService;
//import com.edu.shop.service.OrderdetailService;
//import com.edu.shop.service.ProductService;
//import com.edu.shop.service.VNPayService;
//
//import jakarta.servlet.http.HttpServletRequest;
//
//@RestController
//@RequestMapping("/api/shopping")
//public class ShoppingCartRestController {
//
//    public static final short PENDING = 0;
//    public static final short CONFIRMED = 1;
//    public static final short COMPLETED = 2;
//
//    @Autowired
//    ProductService productService;
//
//    @Autowired
//    OrderdetailService orderdetailService;
//
//    @Autowired
//    OrderService orderService;
//
//    @Autowired
//    CustomerService customerService;
//
//    @Autowired
//    private VNPayService vnPayService;
//
//
//
//
//
//
//
////    @PostMapping("/cart/discount")
////    public ResponseEntity<DiscountResponse> applyDiscount(@RequestParam("code") String code) {
////        discount discount = discountService.findByCode(code);
////        
////        if (discount == null) {
////            return new ResponseEntity<>(new DiscountResponse("Mã giảm giá không tồn tại", null, null), HttpStatus.OK);
////        }
////        
////        Date currentDate = new Date();
////        if (discount.getEndDate().before(currentDate)) {
////            return new ResponseEntity<>(new DiscountResponse("Mã giảm giá đã hết hạn", null, null), HttpStatus.OK);
////        }
////        
////        Double giaGiam = discount.getAmount();
////        String tenMa = discount.getName();
////        
////        DiscountResponse response = new DiscountResponse("Discount applied.", tenMa, giaGiam);
////        return new ResponseEntity<>(response, HttpStatus.OK);
////    }
//
//    @PostMapping("/create")
//    public ResponseEntity<String> createPayment( HttpServletRequest request) throws UnsupportedEncodingException {
//        long amount = 1000000;
//        String paymentUrl = vnPayService.createPayment(amount, request);
//        return ResponseEntity.ok(paymentUrl);
//    }
//
//        @PostMapping("/cart/createInvoice")
//        public ResponseEntity<Map<String, Object>> createInvoice(@RequestBody InvoiceRequest invoiceRequest,@RequestBody CartItemsRequest [] cartItemsRequest) {
//            Map<String, Object> response = new HashMap<>();
//            System.out.println("invoiceRequest----------------------"+invoiceRequest.toString());
//            
//            if (cartItemsRequest.length<1) {
//                System.out.println("Giỏ hàng của bạn trống, vui lòng chọn sản phẩm trước khi thanh toán");
//                response.put("errorMessage", "Giỏ hàng của bạn trống, vui lòng chọn sản phẩm trước khi thanh toán.");
//                return new ResponseEntity<>(response, HttpStatus.OK);
//            }
//            System.out.println("Dang Thanh Toán ---------------------------");
//            Order order = new Order();
//            String email =invoiceRequest.getEmail();
//            Optional<Customer> optional = customerService.findByEmail(email);
//            
//            if (optional.isPresent()) {
//                Customer customer = optional.get();
//                order.setCustomer(customer);
//            } else {
//            	System.out.println("BẠN CHƯA ĐĂNG NHẬP!");
//                return new ResponseEntity<>(response, HttpStatus.OK);
//            }
//            
//            Date date = new Date();
//            order.setOrderDate(date);
//            order.setAmount(invoiceRequest.getAmont()); 
//            order.setStatus(PENDING);
//            
//            // Lưu hóa đơn vào cơ sở dữ liệu
//            Order savedInvoice = orderService.save(order); 
//            System.out.println("Lưu Thành Công Hoa Don ---------------------------");
//
//            // Gán hóa đơn tương ứng cho mỗi chi tiết hóa đơn
//            for (CartItemsRequest cartItem : cartItemsRequest) {
//                OrderDetail detail = new OrderDetail();
//                Optional<Product> product = productService.findById(cartItem.getProductId());
//                // Gán Order cho OrderDetail
//                detail.setOrder(order);
//                // Gán thông tin chi tiết sản phẩm
//                detail.setName(cartItem.getName());
//                detail.setDiscount(cartItem.getDiscount());
//                detail.setProduct(product.get());
//                detail.setQuantity(cartItem.getQuantity());
//                detail.setUnitPrice(product.get().getSalePrice());
//
//                // Lưu OrderDetail
//                System.out.println("Lưu Thanh Công Hoa Don Chi Tiết ---------------------------");
//                orderdetailService.save(detail);
//                
//                // Cập nhật số lượng sản phẩm trong kho
//                product.get().setQuantity(product.get().getQuantity() - cartItem.getQuantity());
//                productService.save(product.get());
//            }
////        //  lữu địa chỉ và số điện thoại người đắt hàng
////            Shipping shipping = new Shipping();
////            shipping.setCommune(invoiceRequest.getCommune());
////            shipping.setDistrict(invoiceRequest.getDistrict());
////            shipping.setProvince(invoiceRequest.getProvince());
////            shipping.setHouseNumber(invoiceRequest.getHouseNumber());
////            shipping.setFullname(invoiceRequest.getFullName());
////            shipping.setPhone(invoiceRequest.getPhoneNumber());
////            shipping.setOrder(order);
////            shipping.setShipping_Modes("giao hàng tiết kiệm");// để mặc đỉnh đã ngày 12/8 sửa lại
////            short demo = 1;  // mode : để mặc đinh 1 "chưa vẫn chuyển"
////            shipping.setStatus(demo);
////            shippingService.save(shipping);// luu vao csdl
//            response.put("message", "THÀNH TOÀN THÀNH CÔNG");
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        }
//
//
//
//}
