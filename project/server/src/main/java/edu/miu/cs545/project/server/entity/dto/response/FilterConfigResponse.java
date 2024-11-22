package edu.miu.cs545.project.server.entity.dto.response;

import edu.miu.cs545.project.server.entity.dto.CategoryDto;
import lombok.Data;

import java.util.List;

@Data
public class FilterConfigResponse {
    private List<CategoryResponse> categories;
    private List<String> brands;
    private List<String> colors;
    private List<String> sizes;
    private List<String> materials;
}
