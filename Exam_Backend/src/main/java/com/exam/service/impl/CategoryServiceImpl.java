package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category addCategory(Category category) {
		
		return this.categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category) {
		return this.categoryRepository.save(category);
		
	}

	@Override
	public Set<Category> getCategory() {
		return new LinkedHashSet<>( this.categoryRepository.findAll());
	}

	@Override
	public Category getCategory(Long categoryId) {	
		return this.categoryRepository.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(Long categoryId) {
//		Category category = new Category();
//		category.setCid(categoryId);
		this.categoryRepository.deleteById(categoryId);
				
	}

}
