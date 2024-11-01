package com.edu.shop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.edu.shop.domain.Tag;
import com.edu.shop.repository.TagRepostory;
import com.edu.shop.service.TagService;

@Service
public class TagServiceImpl implements TagService{
	@Autowired
	TagRepostory repostory;

	@Override
	public List<Tag> findByNameContaining(String Name) {
		return repostory.findByNameContaining(Name);
	}

	@Override
	public <S extends Tag> S save(S entity) {
		return repostory.save(entity);
	}

	@Override
	public List<Tag> findAll(Sort sort) {
		return repostory.findAll(sort);
	}

	@Override
	public void flush() {
		repostory.flush();
	}

	@Override
	public Page<Tag> findAll(Pageable pageable) {
		return repostory.findAll(pageable);
	}

	@Override
	public List<Tag> findAll() {
		return repostory.findAll();
	}

	@Override
	public Optional<Tag> findById(Long id) {
		return repostory.findById(id);
	}

	@Override
	public boolean existsById(Long id) {
		return repostory.existsById(id);
	}

	@Override
	public Tag getOne(Long id) {
		return repostory.getOne(id);
	}

	@Override
	public long count() {
		return repostory.count();
	}

	@Override
	public void deleteById(Long id) {
		repostory.deleteById(id);
	}

	@Override
	public Tag getById(Long id) {
		return repostory.getById(id);
	}

	@Override
	public void delete(Tag entity) {
		repostory.delete(entity);
	}

	@Override
	public void deleteAll() {
		repostory.deleteAll();
	}
	
	

}
