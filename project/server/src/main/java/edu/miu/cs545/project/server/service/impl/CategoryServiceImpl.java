package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Category;
import edu.miu.cs545.project.server.entity.dto.CategoryDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveCategoryRequest;
import edu.miu.cs545.project.server.entity.dto.response.CategoryResponse;
import edu.miu.cs545.project.server.repository.CategoryRepo;
import edu.miu.cs545.project.server.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final ModelMapper modelMapper;
    private final CategoryRepo categoryRepo;

    @Override
    public List<CategoryResponse> getAllCategories() {
        var result = new ArrayList<CategoryResponse>();
        var items = categoryRepo.findAll();
        getCategories(items, result, null);

        return result;
    }

    private void getCategories(List<Category> categories, List<CategoryResponse> categoriesResponse, Category parent) {
        for (var item : categories) {
            if (item.getParentCategory() == parent) {
                var t = modelMapper.map(item, CategoryResponse.class);
                t.setSubCategories(new ArrayList<>());
                getCategories(item.getSubCategories(), t.getSubCategories(), item);
                categoriesResponse.add(t);
            }
        }
    }

    @Override
    public Page<CategoryDto> getAll(Pageable pageable) {
        var categories = categoryRepo.findAll(pageable);
        return categories.map(category -> modelMapper.map(category, CategoryDto.class));
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepo.findById(id).orElse(null);
        if (category != null) {
            return modelMapper.map(category, CategoryDto.class);
        }
        return null;
    }

    @Override
    public void saveCategory(SaveCategoryRequest category) {
        Category categoryEntity;
        if (category.getParentId() == null || category.getId() == 0) {
            categoryEntity = new Category();
        }
        else {
            categoryEntity = categoryRepo.findById(category.getId()).orElse(null);
        }
        if (categoryEntity != null) {
            modelMapper.map(category, categoryEntity);
            if (category.getParentId() != null && category.getParentId() > 0) {
                categoryRepo.findById(category.getParentId())
                    .ifPresent(categoryEntity::setParentCategory);
            }
            categoryRepo.save(categoryEntity);
        }
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepo.findById(id).ifPresent(categoryRepo::delete);
    }
}
