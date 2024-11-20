package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long id;

    private ProductDto product;

    private int quantity;
}
