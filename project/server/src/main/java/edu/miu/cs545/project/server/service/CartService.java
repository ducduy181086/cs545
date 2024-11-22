package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.CartDto;

public interface CartService {
    CartDto getCart();
    CartDto addItemToCart(Long productId, int quantity, String size, String color);
    void updateCartItem(Long cartItemId, int quantity, String size, String color);
    void removeCartItem(Long cartItemId);
    void clearCart(Long cartId);
}
