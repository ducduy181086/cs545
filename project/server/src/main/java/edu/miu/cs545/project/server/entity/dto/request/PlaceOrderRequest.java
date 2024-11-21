package edu.miu.cs545.project.server.entity.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class PlaceOrderRequest {
    private List<PlaceOrderItemRequest> items;
}
