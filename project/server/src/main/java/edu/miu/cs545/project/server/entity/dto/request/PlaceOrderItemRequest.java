package edu.miu.cs545.project.server.entity.dto.request;

import lombok.Data;

@Data
public class PlaceOrderItemRequest {
    private int quantity;
    private Long productId;
}
