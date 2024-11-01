package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.constants.PostStatus;
import com.edu.shop.domain.Post;
import com.edu.shop.domain.PostComment;
import com.edu.shop.domain.Tag;
import com.edu.shop.repository.PostRepository;
import com.edu.shop.service.PostService;
import com.edu.shop.service.StorageService;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	StorageService storageService;

	@Override
	public List<PostComment> findCommentsByPostId(Integer postId) {
		return postRepository.findCommentsByPostId(postId);
	}

	@Override
	public List<Post> findByPostTag(Tag tag) {
		return postRepository.findByTag(tag);
	}

	@Override
	public List<Post> findByStatus(PostStatus status) {
		return postRepository.findByStatus(status);
	}

	@Override
	public <S extends Post> S save(S entity) {
		return postRepository.save(entity);
	}

	@Override
	public List<Post> findAll() {
		return postRepository.findAll();
	}

	@Override
	public Optional<Post> findById(Integer id) {
		return postRepository.findById(id);
	}

	@Override
	public long count() {
		return postRepository.count();
	}

	@Override
	public void deleteById(Integer id) {
		postRepository.deleteById(id);
	}

	@Override
	public Post getById(Integer id) {
		return postRepository.getById(id);
	}

	@Override
	public void delete(Post entity) {
		postRepository.delete(entity);
	}
	
	
	
	@Override
	public void uploadImage(Integer postId,  MultipartFile imageFile) {
		Optional<Post> optional = findById(postId);
		  Post entity = optional.get();
		if (imageFile != null && !imageFile.isEmpty()) {
			UUID uuid = UUID.randomUUID();
			String uustring = uuid.toString();
			entity.setImage(storageService.getStoreFilename(imageFile, uustring));
			storageService.store(imageFile, entity.getImage());
			save(entity);
	
		
	}
		
	}
	

}
