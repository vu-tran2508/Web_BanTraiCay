package com.edu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.PostComment;


@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long>{

}
