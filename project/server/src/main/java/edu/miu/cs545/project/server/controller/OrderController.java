package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.OrderDto;
import edu.miu.cs545.project.server.entity.dto.OrderItemDto;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderFromCartRequest;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderItemRequest;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderRequest;
import edu.miu.cs545.project.server.service.CartService;
import edu.miu.cs545.project.server.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {
    private final ModelMapper modelMapper;
    private final OrderService orderService;
    private final CartService cartService;

    @GetMapping("/history")
    public Page<OrderDto> getOrderHistory(
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) throws Exception {
        Pageable pageable = PageRequest.of(page, pageSize);
        return orderService.getOrderHistory(pageable);
    }

    @GetMapping()
    public Page<OrderDto> getOrderStatus(
        @RequestParam(name="status", defaultValue = "") String status,
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) throws Exception {
        Pageable pageable = PageRequest.of(page, pageSize);
        if ("".equals(status)) {
            return orderService.getOrderHistory(pageable);
        }
        return orderService.getOrdersByStatus(status, pageable);
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable Long id) {
        return orderService.getById(id);
    }

    @GetMapping("/{orderId}/items")
    public List<OrderItemDto> getOrderItems(@PathVariable Long orderId) {
        return orderService.getOrderItems(orderId);
    }

    @PostMapping("/place")
    public void placeOrder(@RequestBody PlaceOrderFromCartRequest orderRequest) {
        var cart = cartService.getCart();
        var items = cart.getItems();
        var order = modelMapper.map(orderRequest, PlaceOrderRequest.class);
        order.setItems(items.stream().map(item -> new PlaceOrderItemRequest(
            item.getQuantity(), item.getProduct().getId(), item.getSize(), item.getColor()))
            .collect(Collectors.toList()));
        cartService.clearCart(cart.getId());
        orderService.placeOrder(order);
    }

    @PutMapping("/cancel/{orderId}")
    public boolean cancelOrder(@PathVariable Long orderId) {
        return orderService.cancelOrder(orderId);
    }

    @PutMapping("/change/{orderId}")
    public boolean changeStatus(
        @PathVariable Long orderId,
        @RequestParam(name="status") String status) {
        return orderService.changeStatus(orderId, status);
    }
}
