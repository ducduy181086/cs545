package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private String status; // "Pending", "Shipped", "On the way", "Delivered", "Cancelled"
    private Double subtotal;
    private Double totalDiscount;
    private Double tax;
    private Double total;

    private LocalDateTime orderDate;
    private List<OrderItemDto> items;
}
