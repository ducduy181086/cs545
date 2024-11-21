package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long id;
    private int quantity;
    private ProductDto product;
    private String size;
    private String color;
}
