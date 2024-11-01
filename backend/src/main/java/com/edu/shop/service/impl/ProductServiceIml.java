package com.edu.shop.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.edu.shop.domain.Category;
import com.edu.shop.domain.Customer;
import com.edu.shop.domain.Product;
import com.edu.shop.domain.ProductImage;
import com.edu.shop.repository.ProductRepository;
import com.edu.shop.service.ProductImageService;
import com.edu.shop.service.ProductService;
import com.edu.shop.service.StorageService;

@Service
public class ProductServiceIml implements ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	StorageService storageService;
	
	@Autowired
	ProductImageService imageService;

	@Override
	public List<Product> findByCategory(Category category) {
		return productRepository.findByCategory(category);
	}

    @Override
	public void uploadImage(Integer productId, MultipartFile[] imageFiles) {
        Product entity = findById(productId).orElse(null);
    
        // Chỉ lấy phần tử đầu tiên từ mảng imageFiles (nếu mảng có ít nhất một phần tử)
        if (imageFiles != null && imageFiles.length > 0 && !imageFiles[0].isEmpty()) {
            MultipartFile firstImageFile = imageFiles[0];

            UUID uuid = UUID.randomUUID();
            String uustring = uuid.toString();
            entity.setImage(storageService.getStoreFilename(firstImageFile, uustring));
            storageService.store(firstImageFile, entity.getImage());
            save(entity);
        }
        
       //    Lưu list các hinh ảnh chỉ tiết
        for (MultipartFile imageFile : imageFiles) {
            ProductImage image = new ProductImage();
            // Xử lý và lưu tệp hình ảnh
            String fileName = imageFile.getOriginalFilename();
            UUID uuid = UUID.randomUUID();
            String uutring = uuid.toString();
            image.setImageUrl(storageService.getStoreFilename(imageFile, uutring));
            storageService.store(imageFile, image.getImageUrl());
            image.setProduct(entity);
            imageService.save(image);
        }
    }
    
//    @Override
//	public void uploadImage(Integer productId, MultipartFile[] imageFiles) {
//	    Product entity = findById(productId).orElse(null);
//
//	    if (entity == null) {
//	        // Xử lý khi không tìm thấy sản phẩm
//	        return;
//	    }
//
//	    // Xóa tất cả các ảnh chi tiết của sản phẩm từ cả CSDL
//	    List<ProductImage> productImages = new ArrayList<>(entity.getImages());
//	    productImages.forEach(productImage -> {
//	        try {
//	        	imageService.deleteById(productImage.getImageId());
//	            storageService.delete(productImage.getImageUrl());
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	        }
//	    });
//
//	    // Nếu không có file ảnh mới, chỉ cần xóa ảnh cũ và ảnh chi tiết là đủ
//	    if (imageFiles == null || imageFiles.length == 0 || imageFiles[0].isEmpty()) {
//	        entity.setImage(null);
//	        entity.setImages(new ArrayList<>());
//	        save(entity);
//	        return;
//	    }
//	    // Lưu ảnh mới cho sản phẩm
//	    MultipartFile firstImageFile = imageFiles[0];
//	    UUID uuid = UUID.randomUUID();
//	    String uustring = uuid.toString();
//	    String newImageFilename = storageService.getStoreFilename(firstImageFile, uustring);
//	    entity.setImage(newImageFilename);
//	    storageService.store(firstImageFile, newImageFilename);
//	    save(entity);
//
//	    // Lưu list các ảnh chi tiết
//	    for (MultipartFile imageFile : imageFiles) {
//	        ProductImage image = new ProductImage();
//	        UUID imageUuid = UUID.randomUUID();
//	        String imageUuidString = imageUuid.toString();
//	        String imageUrl = storageService.getStoreFilename(imageFile, imageUuidString);
//	        image.setImageUrl(imageUrl);
//	        storageService.store(imageFile, imageUrl);
//	        image.setProduct(entity);
//	        imageService.save(image);
//	    }
//	}

    @Override
    public <S extends Product> S save(S entity) {
        Integer productId = entity.getProductId();
        if (productId != null) {
            Optional<Product> optExist = findById(productId);
            System.out.println("Người Tim :" + optExist);

            if (optExist.isPresent()) {
                if (StringUtils.isEmpty(entity.getImage())) {
                    System.out.println("Update Lấy Lại image----------");
                    entity.setImage(optExist.get().getImage());
                }

    			Date currentDate = new Date();
    			// Thiết lập giá trị ngày hiện tại cho thuộc tính enterDate của đối tượng entity
    			entity.setUpdateDate(currentDate);
            }
        }
        return productRepository.save(entity);
    }

    
    
    
    @Override
	public List<Product> findByCategory_CategoryId(Long categoryId) {
		return productRepository.findByCategory_CategoryId(categoryId);
	}
    
    
    

	@Override
	public List<Product> findBySupplier_SupplierId(Long supplierId) {
		return productRepository.findBySupplier_SupplierId(supplierId);
	}

	@Override
	public List<Product> findBySupplier_SupplierIdIn(List<Long> supplierIds) {
		return productRepository.findBySupplier_SupplierIdIn(supplierIds);
	}

	@Override
	public List<Product> findByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findBySalePriceBetween(minPrice, maxPrice);
    }
    
    
	
	

	@Override
	public List<Product> findByCategory_SlugIn(List<String> categorySlugs) {
		return productRepository.findByCategory_SlugIn(categorySlugs);
	}

	@Override
	public List<Product> findByNameContaining(String Name) {
		return productRepository.findByNameContaining(Name);
	}

	@Override
	public Page<Product> findByNameContaining(String Name, Pageable pageable) {
		return productRepository.findByNameContaining(Name, pageable);
	}

	@Override
	public List<Product> findByCategory_CategoryIdIn(List<Long> categoryIds) {
		return productRepository.findByCategory_CategoryIdIn(categoryIds);
	}

	@Override
	public List<Product> findAll(Sort sort) {
		return productRepository.findAll(sort);
	}

	@Override
	public void flush() {
		productRepository.flush();
	}

	@Override
	public Page<Product> findAll(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	@Override
	public <S extends Product> S saveAndFlush(S entity) {
		return productRepository.saveAndFlush(entity);
	}

	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public void deleteInBatch(Iterable<Product> entities) {
		productRepository.deleteInBatch(entities);
	}

	@Override
	public Optional<Product> findById(Integer id) {
		return productRepository.findById(id);
	}

	@Override
	public void deleteAllInBatch(Iterable<Product> entities) {
		productRepository.deleteAllInBatch(entities);
	}

	@Override
	public boolean existsById(Integer id) {
		return productRepository.existsById(id);
	}

	@Override
	public void deleteAllByIdInBatch(Iterable<Integer> ids) {
		productRepository.deleteAllByIdInBatch(ids);
	}

	@Override
	public <S extends Product> boolean exists(Example<S> example) {
		return productRepository.exists(example);
	}

	@Override
	public void deleteAllInBatch() {
		productRepository.deleteAllInBatch();
	}

	@Override
	public Product getOne(Integer id) {
		return productRepository.getOne(id);
	}

	@Override
	public <S extends Product, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction) {
		return productRepository.findBy(example, queryFunction);
	}

	@Override
	public long count() {
		return productRepository.count();
	}

	@Override
	public void deleteById(Integer id) {
		productRepository.deleteById(id);
	}

	@Override
	public Product getById(Integer id) {
		return productRepository.getById(id);
	}

	@Override
	public void delete(Product entity) {
		productRepository.delete(entity);
	}

	@Override
	public Product getReferenceById(Integer id) {
		return productRepository.getReferenceById(id);
	}

	@Override
	public void deleteAllById(Iterable<? extends Integer> ids) {
		productRepository.deleteAllById(ids);
	}

	@Override
	public void deleteAll(Iterable<? extends Product> entities) {
		productRepository.deleteAll(entities);
	}

	@Override
	public void deleteAll() {
		productRepository.deleteAll();
	}

}