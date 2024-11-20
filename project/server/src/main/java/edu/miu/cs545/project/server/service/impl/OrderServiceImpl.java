package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Buyer;
import edu.miu.cs545.project.server.entity.Order;
import edu.miu.cs545.project.server.entity.OrderItem;
import edu.miu.cs545.project.server.entity.Product;
import edu.miu.cs545.project.server.entity.dto.OrderDto;
import edu.miu.cs545.project.server.entity.dto.OrderItemDto;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderItemRequest;
import edu.miu.cs545.project.server.entity.dto.request.PlaceOrderRequest;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.BuyerRepo;
import edu.miu.cs545.project.server.repository.OrderItemRepo;
import edu.miu.cs545.project.server.repository.OrderRepo;
import edu.miu.cs545.project.server.repository.ProductRepo;
import edu.miu.cs545.project.server.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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

    @Override
    public Page<OrderDto> getOrderHistory(Pageable pageable) throws Exception {
        var buyer = getCurrentBuyer();
        if (buyer.isPresent()) {
            var items = orderRepo.findByBuyerId(buyer.get().getId(), pageable);
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
        throw new Exception("Cannot find buyer.");
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
        var savedOrder = orderRepo.save(orderEntity);

        for (int i = 0; i < order.getItems().size(); i++) {
            var productItem = order.getItems().get(i);
            if (productMap.containsKey(productItem.getProductId())) {
                OrderItem item = new OrderItem();
                item.setOrder(savedOrder);
                var product = productMap.get(productItem.getProductId());
                item.setProduct(product);
                item.setQuantity(productItem.getQuantity());
                orderItemRepo.save(item);

                // reduce the quantity of product
                product.setQuantity(product.getQuantity() - productItem.getQuantity());
                productRepo.save(product);
            }
        }
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
}
