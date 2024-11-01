package com.edu.shop.controller.admin;

import java.util.List;

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

import com.edu.shop.domain.Tag;
import com.edu.shop.model.dto.TagDto;
import com.edu.shop.service.TagService;

@RestController
@RequestMapping("/api/admin/tags")
@CrossOrigin(origins = "http://localhost:3000")
public class TagRestController {
	@Autowired
	TagService tagservice;

	@GetMapping
	public ResponseEntity<List<Tag>> getAllCategories() {
		List<Tag> Tags = tagservice.findAll();
		return ResponseEntity.ok(Tags);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Tag> getCategoryById(@PathVariable Long id) {
		Tag tag = tagservice.findById(id).orElse(null);
		if (tag != null) {
			return ResponseEntity.ok(tag);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PostMapping
	public ResponseEntity<Tag> createCategory(@RequestBody TagDto tagDto) {
		Tag entity = new Tag();
		BeanUtils.copyProperties(tagDto, entity);
		Tag saved = tagservice.save(entity);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Tag> updateCategory(@PathVariable Long id, @RequestBody TagDto tagDto) {
		if (tagservice.existsById(id)) {
			tagDto.setTag_id(id);
			Tag entity = new Tag();
			BeanUtils.copyProperties(tagDto, entity);
			Tag updated = tagservice.save(entity);
			return ResponseEntity.ok(updated);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
		if (tagservice.existsById(id)) {
			tagservice.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

}
