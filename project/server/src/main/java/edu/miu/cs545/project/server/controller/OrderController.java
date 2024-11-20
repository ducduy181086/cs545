package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.OrderDto;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderRequest;
import edu.miu.cs545.project.server.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/history")
    public Page<OrderDto> getOrderHistory(
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) throws Exception {
        Pageable pageable = PageRequest.of(page, pageSize);
        return orderService.getOrderHistory(pageable);
    }

    @GetMapping()
    public Page<OrderDto> getOrderStatus(
        @RequestParam(name="status", defaultValue = "0") String status,
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) throws Exception {
        Pageable pageable = PageRequest.of(page, pageSize);
        return orderService.getOrdersByStatus(status, pageable);
    }

    @PostMapping("/place")
    public void placeOrder(@RequestBody PlaceOrderRequest order) {
        orderService.placeOrder(order);
    }

    @PutMapping("/cancel/{orderId}")
    public boolean cancelOrder(@PathVariable Long orderId) {
        return orderService.cancelOrder(orderId);
    }
}
