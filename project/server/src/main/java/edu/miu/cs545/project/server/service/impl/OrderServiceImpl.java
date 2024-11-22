package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.*;
import edu.miu.cs545.project.server.entity.dto.OrderDto;
import edu.miu.cs545.project.server.entity.dto.OrderItemDto;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderItemRequest;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderRequest;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.*;
import edu.miu.cs545.project.server.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final ModelMapper modelMapper;
    private final BuyerRepo buyerRepo;
    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final ProductRepo productRepo;
    private final SellerRepo sellerRepo;

    @Override
    public Page<OrderDto> getOrderHistory(Pageable pageable) throws Exception {
        var buyer = getCurrentBuyer();
        if (buyer.isPresent()) {
            var items = orderRepo.findByBuyerId(buyer.get().getId(), pageable);
            return items.map(m -> modelMapper.map(m, OrderDto.class));
        }
        var seller = getCurrentSeller();
        if (seller.isPresent()) {
            var items = orderRepo.findBySellerId(seller.get().getId(), pageable);
            return items.map(m -> modelMapper.map(m, OrderDto.class));
        }
        throw new Exception("Cannot find buyer.");
    }

    @Override
    public Page<OrderDto> getOrdersByStatus(String status, Pageable pageable) throws Exception {
        var buyer = getCurrentBuyer();
        if (buyer.isPresent()) {
            var items = orderRepo.findByBuyerIdAndStatus(buyer.get().getId(), status, pageable);
            return items.map(m -> modelMapper.map(m, OrderDto.class));
        }
        var seller = getCurrentSeller();
        if (seller.isPresent()) {
            var items = orderRepo.findBySellerIdAndStatus(seller.get().getId(), status, pageable);
            return items.map(m -> modelMapper.map(m, OrderDto.class));
        }
        throw new Exception("Cannot find buyer or seller.");
    }

    @Override
    public boolean cancelOrder(Long orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow();
        if (!"SHIPPED".equalsIgnoreCase(order.getStatus())) {
            order.setStatus("CANCELLED");
            orderRepo.save(order);
            return true;
        }
        return false;
    }

    @Override
    public void placeOrder(PlaceOrderRequest order) {
        var buyer = getCurrentBuyer();
        if (buyer.isEmpty()) return;

        var productMap = productRepo.findAllById(order.getItems().stream().map(PlaceOrderItemRequest::getProductId).toList())
            .stream().collect(Collectors.toMap(Product::getId, product -> product));
        if (productMap.isEmpty()) return;

        var orderEntity = new Order();
        orderEntity.setStatus("PENDING");
        orderEntity.setBuyer(buyer.get());
        var firstProduct = productMap.values().stream().toList().get(0);
        orderEntity.setSeller(firstProduct.getSeller());
        calculateOrder(orderEntity, order, productMap);
        var savedOrder = orderRepo.save(orderEntity);

        for (int i = 0; i < order.getItems().size(); i++) {
            var productItem = order.getItems().get(i);
            if (productMap.containsKey(productItem.getProductId())) {
                OrderItem item = new OrderItem();
                item.setOrder(savedOrder);
                var product = productMap.get(productItem.getProductId());
                item.setProduct(product);
                item.setQuantity(productItem.getQuantity());
                item.setSize(productItem.getSize());
                item.setColor(productItem.getColor());
                orderItemRepo.save(item);

                // reduce the quantity of product
                product.setQuantity(product.getQuantity() - productItem.getQuantity());
                productRepo.save(product);
            }
        }
    }

    @Override
    public boolean changeStatus(Long orderId, String status) {
        Order order = orderRepo.findById(orderId).orElseThrow();
        order.setStatus(status);
        orderRepo.save(order);
        return true;
    }

    @Override
    public List<OrderItemDto> getOrderItems(Long orderId) {
        return orderItemRepo.findByOrderId(orderId)
            .stream().map(m -> modelMapper.map(m, OrderItemDto.class)).toList();
    }

    private Optional<Buyer> getCurrentBuyer() {
        String username = UserHelper.getCurrentUserName();
        return buyerRepo.findBuyerByEmail(username);
    }

    private Optional<Seller> getCurrentSeller() {
        String username = UserHelper.getCurrentUserName();
        return sellerRepo.findSellerByEmail(username);
    }

    private void calculateOrder(Order orderEntity, PlaceOrderRequest order, Map<Long, Product> productMap) {
        var subtotal = order.getItems().stream().mapToDouble(item -> productMap.get(item.getProductId()).getPrice() * item.getQuantity()).sum();
        var totalDiscount = order.getItems().stream().mapToDouble(item -> (productMap.get(item.getProductId()).getPrice() * productMap.get(item.getProductId()).getDiscount() / 100) * item.getQuantity()).sum();
        var tax = subtotal * 5.5 / 100;
        var total = subtotal - totalDiscount + tax;
        orderEntity.setSubtotal(subtotal);
        orderEntity.setTotalDiscount(totalDiscount);
        orderEntity.setTax(tax);
        orderEntity.setTotal(total);
    }
}
