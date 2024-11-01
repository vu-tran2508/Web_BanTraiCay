package com.edu.shop.controller.admin;

import com.edu.shop.domain.Category;
import com.edu.shop.model.dto.CategoryDto;

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
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import com.edu.shop.service.CategoryService;


@RestController
@RequestMapping("/api/admin/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryRestController {
	@Autowired
	CategoryService categoryService;

	@GetMapping
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = categoryService.findAll();
		return ResponseEntity.ok(categories);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
		Category category = categoryService.findById(id).orElse(null);
		if (category != null) {
			return ResponseEntity.ok(category);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PostMapping
	public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categoryDto) {
		Category entity = new Category();
		BeanUtils.copyProperties(categoryDto, entity);
		Category savedCategory = categoryService.save(entity);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
		if (categoryService.existsById(id)) {
			categoryDto.setCategoryId(id);
			Category entity = new Category();
			BeanUtils.copyProperties(categoryDto, entity);
			Category updatedCategory = categoryService.save(entity);
			return ResponseEntity.ok(updatedCategory);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
		if (categoryService.existsById(id)) {
			categoryService.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

}
