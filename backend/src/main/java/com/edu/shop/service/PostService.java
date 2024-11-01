package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.constants.PostStatus;
import com.edu.shop.domain.Post;
import com.edu.shop.domain.PostComment;
import com.edu.shop.domain.Tag;

public interface PostService {

	void delete(Post entity);

	Post getById(Integer id);

	void deleteById(Integer id);

	long count();

	Optional<Post> findById(Integer id);

	List<Post> findAll();

	<S extends Post> S save(S entity);

	List<Post> findByStatus(PostStatus status);

	List<Post> findByPostTag(Tag tag);

	List<PostComment> findCommentsByPostId(Integer postId);

	void uploadImage(Integer postId, MultipartFile imageFile);

}
