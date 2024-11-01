package com.edu.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Tag;

@Repository
public interface TagRepostory extends JpaRepository<Tag, Long>{
	List<Tag> findByNameContaining(String Name);

}
