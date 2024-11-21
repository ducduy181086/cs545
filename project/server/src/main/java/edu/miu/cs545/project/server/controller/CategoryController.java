package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.CategoryDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveCategoryRequest;
import edu.miu.cs545.project.server.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<Page<CategoryDto>> getAll(Pageable pageable) {
        var items = categoryService.getAll(pageable);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getById(@PathVariable Long id) {
        CategoryDto category = categoryService.getCategoryById(id);
        if (category == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(category);
    }

    @PostMapping()
    public void create(@RequestBody SaveCategoryRequest category) {
        categoryService.saveCategory(category);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody SaveCategoryRequest category) {
        category.setId(id);
        categoryService.saveCategory(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
