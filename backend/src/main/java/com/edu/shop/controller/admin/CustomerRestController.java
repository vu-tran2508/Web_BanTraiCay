package com.edu.shop.controller.admin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.User;
import com.edu.shop.model.dto.CustomerDto;
import com.edu.shop.repository.UserRespository;

import org.springframework.http.HttpHeaders;

import com.edu.shop.service.CustomerService;
import com.edu.shop.service.StorageService;
import com.edu.shop.service.UserService;

import io.micrometer.common.util.StringUtils;

@RestController
@RequestMapping("/api/admin/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerRestController {

	@Autowired
	CustomerService customerService;
	@Autowired
	StorageService storageService;
	
	@Autowired
	UserService userService;
	
	
	@Autowired
     UserRespository userRespository;

	@PutMapping("/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody CustomerDto customerDto) {
		Optional<User> user =userRespository.findByEmail(customerDto.getEmail());
		if (customerService.existsById(id)) {
			customerDto.setCustomerId(id);
			System.out.println("KHÁCH HÀNG 1"+customerDto);
			Customer entity = new Customer();
			BeanUtils.copyProperties(customerDto, entity);
			System.out.println("KHÁCH HÀNG"+entity);
			entity.setUser(user.get());
			Customer updated = customerService.save(entity);
			return ResponseEntity.ok(updated);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	@GetMapping("list")
	public ResponseEntity<List<CustomerDto>> list() {
		System.out.println("NGƯỜI DUNG :");
	    List<Customer> customers = customerService.findAll();
	    List<CustomerDto> dtos = new ArrayList<>();

	    for (Customer customer : customers) {
	        CustomerDto dto = new CustomerDto();
	        BeanUtils.copyProperties(customer, dto);
	        dtos.add(dto);
	    }

	    if (customers.isEmpty()) {
	        // Trả về lỗi nếu không tìm thấy khách hàng
	        return ResponseEntity.notFound().build();
	    }

	    return ResponseEntity.ok(dtos);
	}

	
	@GetMapping("edit/{customerId}")
	public ResponseEntity<CustomerDto> edit(@PathVariable("customerId") Integer customerId) {
	    Optional<Customer> opt = customerService.findById(customerId);
	    System.out.println("ID"+customerId);
	    if (opt.isEmpty()) {
	        // Trả về lỗi nếu không tìm thấy khách hàng
	        return ResponseEntity.notFound().build();
	    }
	    CustomerDto dto = new CustomerDto();
	    BeanUtils.copyProperties(opt.get(), dto);
	    return ResponseEntity.ok(dto);
	}	
	   @DeleteMapping("/{customerId}")
	    public ResponseEntity<String> delete(@PathVariable("customerId") Integer customerId) throws IOException {
	        Optional<Customer> opt = customerService.findById(customerId);
    	    Optional<User> user =userRespository.findByEmail(opt.get().getEmail());
	        System.out.println("THÔNG TIN : "+opt.get());
	        if (opt.isPresent()) {
	            if (!StringUtils.isEmpty(opt.get().getImage())) {
	                storageService.delete(opt.get().getImage());
	            }
	            userRespository.delete(user.get());
	            customerService.delete(opt.get());
	            return ResponseEntity.ok("Customer delete successful");
	        } else {
	            return ResponseEntity.ok("Customer not found");
	        }
	    }

	   @PostMapping("/save-customer")
	    public ResponseEntity<Integer> saveCustomer(@Validated @RequestBody CustomerDto dto) {
	        try {
	            // Kiểm tra xem email đã được sử dụng chưa
	            if (userRespository.findByEmail(dto.getEmail()).isPresent()) {
	                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	            }
	            // Tạo mới đối tượng User và sao chép dữ liệu từ CustomerDto vào nó
	            User user = new User();
	            user.setEmail(dto.getEmail());
	            user.setPassword(dto.getPassword());
	            User savedUser = userService.saveUser(user);
	            userService.addToUser(savedUser.getEmail(), "ROLE_USER");

	            // Tạo mới đối tượng Customer và sao chép dữ liệu từ CustomerDto vào nó
	            Customer entity = new Customer();
	            BeanUtils.copyProperties(dto, entity);
	            Date currentDate = new Date();
	            entity.setRegisteredDate(currentDate);
	            entity.setUser(savedUser);
	            short status = 0;
	            entity.setStatus(status);
	            // Lưu đối tượng Customer mới
	            Customer savedCustomer = customerService.save(entity);

	            // Trả về một ResponseEntity với thông điệp và dữ liệu
	            return ResponseEntity.ok(savedCustomer.getCustomerId()); // Return the customer ID
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	   

	    @PostMapping("/upload-image")
	    public ResponseEntity<String> uploadImage(
	    		 @RequestParam("customerId") Integer customerId,
	            @RequestParam("imageFile") MultipartFile imageFile) {
             customerService.uploadImage(customerId, imageFile);
	        return ResponseEntity.ok("Image uploaded successfully");
	    }
	    @GetMapping("/{filename:.+}")
	    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
	        // Check if filename is not null or empty
	        if (filename == null || filename.trim().isEmpty()) {
	            return ResponseEntity.badRequest().build();
	        }

	        // Gọi service để load file và trả về dưới dạng Resource
	        Resource file = storageService.loadAsResource(filename);
	        
	        // Trả về response với file đã load
	        return ResponseEntity.ok()
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
	                .body(file);
	    }

	    @GetMapping
	    public ResponseEntity<Map<String, Object>> list(
	            @RequestParam(name = "search", required = false) String search,
	            @RequestParam(name = "page", defaultValue = "0") int page,
	            @RequestParam(name = "size", defaultValue = "5") int size) {
	        try {
	            Pageable pageable = PageRequest.of(page, size, Sort.by("username"));

	            Page<Customer> resultPage;
	            if (search != null && !search.trim().isEmpty()) {
	                resultPage = customerService.findByUsernameContaining(search, pageable);
	            } else {
	                resultPage = customerService.findAll(pageable);
	            }
	            Map<String, Object> response = new HashMap<>();
	            response.put("customers", resultPage.getContent());
	            response.put("currentPage", resultPage.getNumber());
	            response.put("totalItems", resultPage.getTotalElements());
	            response.put("totalPages", resultPage.getTotalPages());
	            return new ResponseEntity<>(response, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	    
//	    
	    
	    
}
