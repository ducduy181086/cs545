package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.CategoryDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveCategoryRequest;
import edu.miu.cs545.project.server.entity.dto.response.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    Page<CategoryDto> getAll(Pageable pageable);
    CategoryDto getCategoryById(Long id);
    void saveCategory(SaveCategoryRequest category);
    void deleteCategory(Long id);
}
