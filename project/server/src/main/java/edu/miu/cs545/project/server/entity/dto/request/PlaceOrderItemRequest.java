package edu.miu.cs545.project.server.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlaceOrderItemRequest {
    private int quantity;
    private Long productId;
    private String size;
    private String color;
}
