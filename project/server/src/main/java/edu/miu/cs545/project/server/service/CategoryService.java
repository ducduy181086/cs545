package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.CategoryDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveCategoryRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryDto> getAll(Pageable pageable);
    CategoryDto getCategoryById(Long id);
    void saveCategory(SaveCategoryRequest category);
    void deleteCategory(Long id);
}
