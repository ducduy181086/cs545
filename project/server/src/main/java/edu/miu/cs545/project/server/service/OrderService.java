package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.OrderDto;
import edu.miu.cs545.project.server.entity.dto.OrderItemDto;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Page<OrderDto> getOrderHistory(Pageable pageable) throws Exception;
    Page<OrderDto> getOrdersByStatus(String status, Pageable pageable) throws Exception;
    boolean cancelOrder(Long orderId);
    void placeOrder(PlaceOrderRequest order);
    boolean changeStatus(Long orderId, String status);
    List<OrderItemDto> getOrderItems(Long orderId);
}
