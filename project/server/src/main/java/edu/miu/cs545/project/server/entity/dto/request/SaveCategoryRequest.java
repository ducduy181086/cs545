package edu.miu.cs545.project.server.entity.dto.request;

import lombok.Data;

@Data
public class SaveCategoryRequest {
    private Long id;
    private String name;
    private Long parentId;
}
