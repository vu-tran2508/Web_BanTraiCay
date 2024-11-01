package com.edu.shop.controller.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.constants.AccountStatus;
import com.edu.shop.domain.Account;
import com.edu.shop.domain.User;
import com.edu.shop.model.dto.AccountDTO;
import com.edu.shop.model.dto.CustomerDto;
import com.edu.shop.repository.UserRespository;
import com.edu.shop.service.AccountService;
import com.edu.shop.service.UserService;

@RestController
@RequestMapping("/api/admin/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

	@Autowired
	AccountService accountService;

	@Autowired
	UserService userService;
	
	@Autowired
	UserRespository respository;

	@PostMapping("/add")
	public ResponseEntity<Map<String, String>> addAccount(@RequestBody AccountDTO accountDTO) {
		Map<String, String> response = new HashMap<>();
		
		System.out.println("THONG TIN"+accountDTO);
		
		try {
			// Kiểm tra xem email đã được sử dụng chưa
			if (respository.findByEmail(accountDTO.getEmail()).isPresent()) {
				response.put("message", "Email đã được sử dụng.");
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}
			// Tạo mới đối tượng Account và sao chép dữ liệu từ AccountDTO vào nó
			Account entity = new Account();
			BeanUtils.copyProperties(accountDTO, entity);
			// Lưu đối tượng Account mới
			entity.setStatus(AccountStatus.ACTIVE);
			Date date = new Date();
			entity.setCreateDate(date);

			User user = new User();
			user.setEmail(accountDTO.getEmail());
			user.setPassword(accountDTO.getPassword());
			User userSave = userService.saveUser(user);
			userService.addToUser(userSave.getEmail(), "ROLE_USER");

			entity.setUser(userSave);
			accountService.save(entity);

			response.put("message", "Tài khoản được thêm thành công.");
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			response.put("message", "Lỗi khi thêm tài khoản.");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete/{accountId}")
	public ResponseEntity<String> deleteAccount(@PathVariable Integer accountId) {
		try {
			Optional<Account> optional = accountService.findById(accountId);
			Account account =optional.get();
			account.setStatus(AccountStatus.LOCKED);
			accountService.save(account);
			return new ResponseEntity<>("Account marked for deletion.", HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>("Account not found.", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("list")
	public ResponseEntity<List<Account>> list() {
		System.out.println("NGƯỜI DUNG :");
		List<Account> account = accountService.findByStatus(AccountStatus.ACTIVE);
		List<CustomerDto> dtos = new ArrayList<>();
		if (account.isEmpty()) {
			// Trả về lỗi nếu không tìm thấy khách hàng
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(account);
	}

}
