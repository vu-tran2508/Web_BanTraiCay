package com.edu.shop.controller.admin;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import java.util.List;
import java.util.Optional;

import com.edu.shop.domain.Category;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.Supplier;
import com.edu.shop.model.dto.CategoryDto;
import com.edu.shop.model.dto.SupplierDto;
import com.edu.shop.service.ProductService;
import com.edu.shop.service.SupplierService;

@RestController
@RequestMapping("/api/admin/suppliers")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierRestController {
	@Autowired
	SupplierService supplierService;
	
	@Autowired
	ProductService productService;

	@GetMapping
	public ResponseEntity<List<Supplier>> getAllSupplier() {
		List<Supplier> supList = supplierService.findAll();
		return ResponseEntity.ok(supList);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
		Supplier supplier = supplierService.findById(id).orElse(null);
		if (supplier != null) {
			return ResponseEntity.ok(supplier);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

	}

	@PostMapping("/create-supplier")
	public ResponseEntity<?> createSupplier(@RequestBody SupplierDto supplierDto) {
	    // Kiểm tra xem email đã được sử dụng chưa
	    if (supplierService.findByAddress(supplierDto.getAddress()).isPresent()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã được sử dụng.");
	    }

	    // Kiểm tra xem tên nhà sản xuất đã tồn tại chưa
	    if (supplierService.findByName(supplierDto.getName()).isPresent()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên nhà sản xuất đã tồn tại.");
	    }
	    // Nếu không có trùng lặp, tiến hành lưu vào cơ sở dữ liệu
	    Supplier entity = new Supplier();
	    BeanUtils.copyProperties(supplierDto, entity);
	    Supplier savedSupplier = supplierService.save(entity);

	    return ResponseEntity.status(HttpStatus.CREATED).body(savedSupplier);
	}

	
	@PostMapping("/upload-image")
	public ResponseEntity<String> uploadImage(@RequestParam("id") Long id,
			@RequestParam("imageFile") MultipartFile imageFile) {
		supplierService.uploadImage(id, imageFile);
		return ResponseEntity.ok("Image uploaded successfully");
	}
		

	@PutMapping("/{id}")
	public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody SupplierDto dto) {

		if (supplierService.existsById(id)) {
			Optional<Supplier> optional = supplierService.findById(id);
			dto.setSupplierId(id);
			Supplier entity = new Supplier();
			BeanUtils.copyProperties(dto, entity);
			entity.setLogo(optional.get().getLogo());
			System.out.println("Nha Cg C"+entity);
			
			Supplier updatesupplier = supplierService.save(entity);
			return ResponseEntity.ok(updatesupplier);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSupplier(@PathVariable Long id) {
	    Optional<Supplier> supplierOptional = supplierService.findById(id);

	    if (supplierOptional.isPresent()) {
	        Supplier supplier = supplierOptional.get();

	        // Kiểm tra xem nhà cung cấp có sản phẩm hay không
	        List<Product> products = productService.findBySupplier_SupplierId(id);
	        if (!products.isEmpty()) {
	            return ResponseEntity.badRequest().body("Không thể xóa nhà cung cấp có sản phẩm.");
	        }

	        supplierService.deleteById(id);
	        return ResponseEntity.ok("Đã xóa nhà cung cấp thành công.");
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}


}
