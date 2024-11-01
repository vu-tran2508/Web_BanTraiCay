package com.edu.shop.service.impl;

import java.util.Optional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.shop.domain.ProductImage;
import com.edu.shop.repository.ProductImageRepostory;
import com.edu.shop.service.ProductImageService;

@Service
public class ProductImageServiceImpl implements ProductImageService{
	@Autowired
	ProductImageRepostory imageRepostory;

	@Override
	public <S extends ProductImage> S save(S entity) {
		return imageRepostory.save(entity);
	}

	@Override
	public List<ProductImage> findAll() {
		return imageRepostory.findAll();
	}

	@Override
	public Optional<ProductImage> findById(Integer id) {
		return imageRepostory.findById(id);
	}

	@Override
	public ProductImage getOne(Integer id) {
		return imageRepostory.getOne(id);
	}

	@Override
	public void deleteById(Integer id) {
		imageRepostory.deleteById(id);
	}

	@Override
	public ProductImage getById(Integer id) {
		return imageRepostory.getById(id);
	}

	@Override
	public void delete(ProductImage entity) {
		imageRepostory.delete(entity);
	}

	@Override
	public void deleteAll() {
		imageRepostory.deleteAll();
	}
	

}
