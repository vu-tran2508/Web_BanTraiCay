package com.edu.shop.controller.site;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.shop.domain.Category;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductImage;
import com.edu.shop.domain.Supplier;
import com.edu.shop.model.dto.imageDTO;
import com.edu.shop.service.CategoryService;
import com.edu.shop.service.ProductImageService;
import com.edu.shop.service.ProductService;
import com.edu.shop.service.StorageService;
import com.edu.shop.service.SupplierService;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "http://localhost:3001")
public class HomeRestController {

	@Autowired
	ProductService productService;

	@Autowired
	CategoryService categoryService;
	
	@Autowired
	SupplierService supplierService;

	@Autowired
	StorageService storageService;

	@Autowired
	ProductImageService imageService;

	@GetMapping("/image/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		// Gọi service để load file và trả về dưới dạng Resource
		Resource file = storageService.loadAsResource(filename);
		// Trả về response với file đã load
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@GetMapping("")
	public ResponseEntity<List<Product>> home() {
		try {
			List<Product> products = productService.findAll();
			System.out.println("SL_SP: " + products.size());

			return ResponseEntity.ok(products);
		} catch (Exception e) {
			// Log the exception
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@GetMapping("/searchByName")
	public ResponseEntity<List<Product>> searchProductsByName(@RequestParam(name = "name") String name) {
	    try {
	        List<Product> foundProducts = productService.findByNameContaining(name);
	        return ResponseEntity.ok(foundProducts);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getCategories() {
		try {
			List<Category> categories = categoryService.findAll(); 
			return ResponseEntity.ok(categories);
		} catch (Exception e) {
			// Log the exception
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@GetMapping("/suppliers")
	public ResponseEntity<List<Supplier>> getSuppliers() {
		try {
			List<Supplier> suppliers = supplierService.findAll(); 
			return ResponseEntity.ok(suppliers);
		} catch (Exception e) {
			// Log the exception
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	

	@GetMapping("/{productId}")
	public ResponseEntity<Map<String, Object>> detail(@PathVariable("productId") Integer productId) {
		Optional<Product> optional = productService.findById(productId);
		Map<String, Object> response = new HashMap<>();

		if (optional.isPresent()) {
			
			response.put("product", optional.get());

			List<ProductImage> images = imageService.findAll();
			List<String> anh = new ArrayList<>();

			for (ProductImage productImage : images) {
				if (productImage.getProduct().equals(optional.get())) {
					anh.add(productImage.getImageUrl());
					System.out.println("Anh tim thay: " + productImage);
				}
			}
			System.out.println("ANH Lien Quan :" + anh);
			response.put("images", anh);

			return ResponseEntity.ok(response);
		} else {
			response.put("message", "Product not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}
	
	
	
    @GetMapping("/filterByPrice")
    public ResponseEntity<List<Product>> filterProductsByPrice(
            @RequestParam(name = "minPrice") Double minPrice,
            @RequestParam(name = "maxPrice") Double maxPrice) {
    	
            List<Product> filteredProducts = productService.findByPriceRange(minPrice, maxPrice);

        return ResponseEntity.ok(filteredProducts);
    }
    
    
    @GetMapping("/findByCategorySlugIn")
    public ResponseEntity<List<Product>> findByCategory_SlugIn(
            @RequestParam(name = "slugIn") List<String> slugIn) {

        // Thực hiện lọc sản phẩm theo danh mục
        List<Product> filteredProducts = productService.findByCategory_SlugIn(null);

        return ResponseEntity.ok(filteredProducts);
    }
    
    
    @GetMapping("/filterByCategory")
    public ResponseEntity<List<Product>> filterProductsByCategory(
            @RequestParam(name = "categoryId") Long categoryId) {

        // Thực hiện lọc sản phẩm theo danh mục
        List<Product> filteredProducts = productService.findByCategory_CategoryId(categoryId);

        return ResponseEntity.ok(filteredProducts);
    }
    
    @GetMapping("/filterByCategorys")
    public ResponseEntity<List<Product>> filterProductsBySupplier(
            @RequestParam(name = "supplierId") List<Long> supplierIds) {
        // Thực hiện lọc sản phẩm theo danh mục
        List<Product> filteredProducts = productService.findBySupplier_SupplierIdIn(supplierIds);

        return ResponseEntity.ok(filteredProducts);
    }
    @GetMapping("/products/filter")
    public ResponseEntity<List<Product>> filterProductsByParams(
            @RequestParam(name = "categoryIds", required = false) List<Long> categoryIds,
            @RequestParam(name = "supplierIds", required = false) List<Long> supplierIds,
            @RequestParam(name = "minPrice", required = false) Double minPrice,
            @RequestParam(name = "maxPrice", required = false) Double maxPrice) {

        List<Product> filteredProducts = productService.findAll();

        // Lọc theo danh mục
        if (categoryIds != null && !categoryIds.isEmpty()) {
            filteredProducts = productService.findByCategory_CategoryIdIn(categoryIds);
        }

        // Lọc theo nhà sản xuất
        if (supplierIds != null && !supplierIds.isEmpty()) {
            filteredProducts.retainAll(productService.findBySupplier_SupplierIdIn(supplierIds));
        }

        // Lọc theo khoảng giá
        if (minPrice != null && maxPrice != null) {
            filteredProducts.retainAll(productService.findByPriceRange(minPrice, maxPrice));
        }

        // Kiểm tra danh sách có rỗng hay không
        if (!filteredProducts.isEmpty()) {
            return ResponseEntity.ok(filteredProducts);
        } else {
            // Trường hợp không có sản phẩm nào thỏa mãn tất cả điều kiện lọc, trả về danh sách trống
            return ResponseEntity.ok(Collections.emptyList());
        }
    }


    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	@GetMapping("type")
	public ResponseEntity<Map<String, Object>> searchByCategory(@RequestParam("param") Long param) {
		Optional<Category> optional = categoryService.findById(param);
		Map<String, Object> response = new HashMap<>();

		try {
			List<Product> productList = productService.findByCategory(optional.orElse(null));
			response.put("CategoryName", optional.map(Category::getName).orElse(null));
			response.put("Category", optional.map(Category::getName).map(String::toUpperCase).orElse(null));
			System.out.println("So Luong" + productList.size());
			response.put("size", productList.size());
			response.put("products", productList);
		} catch (Exception e) {
			response.put("message", "Error fetching products by category");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

		return ResponseEntity.ok(response);
	}
}
