package com.edu.shop.controller.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import com.edu.shop.domain.Account;
import com.edu.shop.domain.Category;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductImage;
import com.edu.shop.domain.Supplier;
import com.edu.shop.model.dto.CategoryDto;
import com.edu.shop.model.dto.CustomerDto;
import com.edu.shop.model.dto.ProducDTO;
import com.edu.shop.model.dto.ProductDto;
import com.edu.shop.model.dto.SupplierDto;
import com.edu.shop.service.AccountService;
import com.edu.shop.service.CategoryService;
import com.edu.shop.service.ProductImageService;
import com.edu.shop.service.ProductService;
import com.edu.shop.service.StorageService;
import com.edu.shop.service.SupplierService;
import io.micrometer.common.util.StringUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductRestController {
	@Autowired
	CategoryService categoryService;

	@Autowired
	SupplierService supplierService;

	@Autowired
	ProductService productService;

	@Autowired
	StorageService storageService;

	@Autowired
	ProductImageService imageService;

	@Autowired
	AccountService accountService;
	private static final Logger logger = LoggerFactory.getLogger(Product.class);
	private final ObjectMapper objectMapper = new ObjectMapper();

	@GetMapping("/categories")
	public ResponseEntity<List<CategoryDto>> getAllCategories() {
		List<CategoryDto> categoryDtos = categoryService.findAll().stream().map(item -> {
			CategoryDto dto = new CategoryDto();
			BeanUtils.copyProperties(item, dto);
			return dto;
		}).toList();
		System.out.println("CATEGORY :" + categoryDtos);
		return ResponseEntity.ok(categoryDtos);
	}

	@GetMapping("/suppliers")
	public ResponseEntity<List<SupplierDto>> getAllSuppliers() {
		List<SupplierDto> supplierDtos = supplierService.findAll().stream().map(item -> {
			SupplierDto dto = new SupplierDto();
			BeanUtils.copyProperties(item, dto);
			return dto;
		}).toList();
		return ResponseEntity.ok(supplierDtos);
	}

	@GetMapping("list")
	public ResponseEntity<List<Product>> list() {
		try {
			logger.info("NGƯỜI DUNG :");
			List<Product> products = productService.findAll();
			if (products.isEmpty()) {
				logger.warn("Empty product list");
				return ResponseEntity.notFound().build();
			}
			String json = objectMapper.writeValueAsString(products);
			logger.info("Serialized product list: {}", json);
			return ResponseEntity.ok(products);
		} catch (JsonProcessingException e) {
			logger.error("Error serializing product list", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{productId}")
	public ResponseEntity<Product> getProductById(@PathVariable("productId") Integer productId) {
		Optional<Product> opt = productService.findById(productId);
		if (opt.isPresent()) {
			Product entity = opt.get();
			return ResponseEntity.ok(entity);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<Integer> saveProduct(@RequestBody ProductDto dto) {
		try {
			System.out.println("DU LIEU " + dto);

			Product entity = new Product();
			BeanUtils.copyProperties(dto, entity);// copy dto bỏ vào entity

			if (dto.getSupplierId() != null) {
				Optional<Supplier> supplierOptional = supplierService.findById(dto.getSupplierId());
				System.out.println("SUPPLLIER " + supplierOptional.get());
				if (supplierOptional.isPresent()) {
					entity.setSupplier(supplierOptional.get());
				} else {
					return ResponseEntity.badRequest().body(-1); // Trả về một giá trị đặc biệt (ví dụ: -1) để biểu thị
																	// lỗi }
				}
			}
			// Kiểm tra và lưu Category nếu có
			if (dto.getCategoryId() != null) {
				Optional<Category> categoryOptional = categoryService.findById(dto.getCategoryId());
				System.out.println("CATEGORY " + categoryOptional.get());
				if (categoryOptional.isPresent()) {
					entity.setCategory(categoryOptional.get());
				} else {

					return ResponseEntity.badRequest().body(-2); // Trả về một giá trị đặc biệt (ví dụ: -2) để biểu //
																	// thị lỗi }
				}
			}

			//
			Optional<Account> accountOptional = accountService.findById(1);
			entity.setAccount(accountOptional.get());
			Date currentDate = new Date();
			entity.setEnterdDate(currentDate);
			entity.setUpdateDate(currentDate);
			System.out.println("SẢN PHẨM SẼ LƯU" + entity);

			Product productSave = productService.save(entity);
			return ResponseEntity.ok(productSave.getProductId());
		} catch (Exception e) {
			e.printStackTrace(); // In lỗi để kiểm tra
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/upload-image")
	public ResponseEntity<String> uploadImage(@RequestParam("productId") Integer productId,
			@RequestParam("imageFile") MultipartFile[] imageFile) {
		System.out.println("Đã nhận được yêu cầu tải lên hình ảnh cho ProductId: " + productId);

		if (imageFile != null) {
			for (MultipartFile file : imageFile) {
				System.out.println("Received image: " + file.getOriginalFilename() + " (Size: " + file.getSize() + ")");
			}
		} else {
			System.out.println("Không nhận được hình ảnh nào !!");
		}

		productService.uploadImage(productId, imageFile);
		return ResponseEntity.ok("Image uploaded successfully");
	}

	@DeleteMapping("/{productId}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Integer productId) throws IOException {
		Optional<Product> opt = productService.findById(productId);

		if (opt.isPresent()) {

			List<ProductImage> images = imageService.findAll();
			Set<ProductImage> imagesl = new HashSet<>();

			for (ProductImage productImage : images) {
				if (productImage.getProduct().equals(opt.get())) {
					imagesl.add(productImage);
					System.out.println("Anh tim thay: " + productImage);
				}
			}

			System.out.println("ANH Lien Quan :" + imagesl);
			// Xóa tất cả các hình ảnh liên quan của sản phẩm
			if (!imagesl.isEmpty()) {

				for (ProductImage image : imagesl) {
					imageService.deleteById(image.getImageId());
					storageService.delete(image.getImageUrl());
					System.out.println("đã xóa Imges -----------" + image.getImageUrl());
					System.out.println("ID IMG" + image.getImageId());

				}
			}
			productService.delete(opt.get());
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();

		}
	}

	@GetMapping
	public ResponseEntity<List<Product>> listAll() {
		try {
			List<Product> productList = productService.findAll();
			return new ResponseEntity<>(productList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/images/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		// Gọi service để load file và trả về dưới dạng Resource
		Resource file = storageService.loadAsResource(filename);
		// Trả về response với file đã load
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@PutMapping("/update/{productId}")
	public ResponseEntity<Integer> updateProduct(@PathVariable Integer productId,
			@RequestBody ProductDto updatedProductDto) {
		try {
			Optional<Product> existingProductOptional = productService.findById(productId);

			if (existingProductOptional.isPresent()) {
				Product existingProduct = existingProductOptional.get();
				// Sử dụng BeanUtils.copyProperties để cập nhật thông tin từ DTO mới sang sản
				// phẩm hiện có
				BeanUtils.copyProperties(updatedProductDto, existingProduct);

				// Cập nhật nhà cung cấp nếu có thay đổi
				if (updatedProductDto.getSupplierId() != null) {
					Optional<Supplier> supplierOptional = supplierService.findById(updatedProductDto.getSupplierId());
					if (supplierOptional.isPresent()) {
						existingProduct.setSupplier(supplierOptional.get());
					} else {
						return ResponseEntity.badRequest().build();
					}
				}
				// Cập nhật danh mục nếu có thay đổi
				if (updatedProductDto.getCategoryId() != null) {
					Optional<Category> categoryOptional = categoryService.findById(updatedProductDto.getCategoryId());
					if (categoryOptional.isPresent()) {
						existingProduct.setCategory(categoryOptional.get());
					} else {
						return ResponseEntity.badRequest().build();
					}
				}
				// Lưu sản phẩm đã cập nhật
				productService.save(existingProduct);
				return ResponseEntity.ok(existingProduct.getProductId());
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
