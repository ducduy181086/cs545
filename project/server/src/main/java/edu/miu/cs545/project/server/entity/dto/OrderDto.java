package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private String status; // "Pending", "Shipped", "On the way", "Delivered", "Cancelled"
    private List<OrderItemDto> items;
}
