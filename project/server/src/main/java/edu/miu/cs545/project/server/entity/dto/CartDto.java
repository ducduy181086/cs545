package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class CartDto {
    private Long id;

    private List<CartItemDto> items;
}
