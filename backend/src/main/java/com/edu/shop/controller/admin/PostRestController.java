package com.edu.shop.controller.admin;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.edu.shop.domain.Account;
import com.edu.shop.domain.Post;
import com.edu.shop.domain.Tag;
import com.edu.shop.model.request.PostRequest;
import com.edu.shop.service.AccountService;
import com.edu.shop.service.PostService;
import com.edu.shop.service.TagService;

@RestController
@RequestMapping("/api/admin/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostRestController {

	@Autowired
	PostService postService;
	@Autowired
	AccountService accountService;
	@Autowired
	TagService tagService;

	@PostMapping
	public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest) {
		try {
			System.out.println("TẠO BÀI VIẾT MỚI " + postRequest);

			// Kiểm tra dữ liệu đầu vào
			if (postRequest == null) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}

			// Chuyển đổi từ PostRequest sang Post
			Post post = new Post();
			post.setName(postRequest.getName());
			post.setDescription(postRequest.getDescription());
			post.setMetaKeywords(postRequest.getMetaKeywords());
			post.setMetaDescription(postRequest.getMetaDescription());
			post.setStatus(postRequest.getStatus());
			Date date = new Date();
			post.setCreateDate(date);

			// Lấy thông tin Account và Tag từ ID
			Account account = accountService.findByEmail(postRequest.getEmailAccount()).orElse(null);
			Tag tag = tagService.findById(postRequest.getTagId()).orElse(null);

			// Kiểm tra null trước khi gán giá trị
			if (account == null || tag == null) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}

			post.setAccount(account);
			post.setTag(tag);

			// Lưu bài đăng mới vào cơ sở dữ liệu
			post = postService.save(post);

			// Kiểm tra kết quả lưu vào cơ sở dữ liệu
			if (post != null) {
				return new ResponseEntity<>(post, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			// Xử lý exception nếu có
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/upload-image")
	public ResponseEntity<String> uploadImage(@RequestParam("postId") Integer customerId,
			@RequestParam("imageFile") MultipartFile imageFile) {
		postService.uploadImage(customerId, imageFile);
		return ResponseEntity.ok("Image uploaded successfully");
	}

	@GetMapping
	public ResponseEntity<List<Post>> getAllPosts() {
		List<Post> posts = postService.findAll();
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}

	@GetMapping("/{postId}")
	public ResponseEntity<Post> getPostById(@PathVariable Integer postId) {
		Optional<Post> optionalPost = postService.findById(postId);
		return optionalPost.map(post -> new ResponseEntity<>(post, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PutMapping("/{postId}")
	public ResponseEntity<Post> updatePost(@PathVariable Integer postId, @RequestBody PostRequest postRequest) {
		Optional<Post> optionalPost = postService.findById(postId);

		return optionalPost.map(post -> {
			post.setName(postRequest.getName());
			post.setDescription(postRequest.getDescription());
			post.setMetaKeywords(postRequest.getMetaKeywords());
			post.setMetaDescription(postRequest.getMetaDescription());
			post.setStatus(postRequest.getStatus());

			// Lấy thông tin Account và Tag từ ID
			post.setAccount(accountService.findByEmail(postRequest.getEmailAccount()).orElse(null));
			post.setTag(tagService.findById(postRequest.getTagId()).orElse(null));

			// Lưu bài đăng đã cập nhật vào cơ sở dữ liệu
			post = postService.save(post);

			return new ResponseEntity<>(post, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Integer postId) {
		Optional<Post> optionalPost = postService.findById(postId);

		if (optionalPost.isPresent()) {
			postService.deleteById(postId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
