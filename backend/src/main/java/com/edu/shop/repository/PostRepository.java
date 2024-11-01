package com.edu.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.constants.PostStatus;
import com.edu.shop.domain.Post;
import com.edu.shop.domain.PostComment;
import com.edu.shop.domain.Tag;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    // Custom query to retrieve comments for a post
    List<PostComment> findCommentsByPostId(Integer postId);

    // Query derivation to find posts by a specific tag
     List<Post> findByTag(Tag tag);

     List<Post> findByStatus(PostStatus status);
}
