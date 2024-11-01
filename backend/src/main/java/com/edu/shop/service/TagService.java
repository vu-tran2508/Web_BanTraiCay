package com.edu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.edu.shop.domain.Tag;

public interface TagService {

	void deleteAll();

	void delete(Tag entity);

	Tag getById(Long id);

	void deleteById(Long id);

	long count();

	Tag getOne(Long id);

	boolean existsById(Long id);

	Optional<Tag> findById(Long id);

	List<Tag> findAll();

	Page<Tag> findAll(Pageable pageable);

	void flush();

	List<Tag> findAll(Sort sort);

	<S extends Tag> S save(S entity);

	List<Tag> findByNameContaining(String Name);

}
