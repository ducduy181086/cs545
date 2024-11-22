package edu.miu.cs545.project.server.entity.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CategoryResponse {
    private Long id;
    private String name;

    private List<CategoryResponse> subCategories;
}
