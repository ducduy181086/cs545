package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

@Data
public class CategoryDto {
    private Long id;
    private String name;

    private CategoryDto parentCategory;
}
