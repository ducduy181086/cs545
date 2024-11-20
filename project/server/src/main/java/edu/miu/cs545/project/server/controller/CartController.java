package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.CartDto;
import edu.miu.cs545.project.server.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping()
    public CartDto getCart() {
        return cartService.getCart();
    }

    @PostMapping("/add-item")
    public CartDto addItem(@RequestParam Long productId, @RequestParam int quantity) {
        return cartService.addItemToCart(productId, quantity);
    }

    @PutMapping("/update-item/{cartItemId}")
    public void updateItem(@PathVariable Long cartItemId, @RequestParam int quantity) {
        cartService.updateCartItem(cartItemId, quantity);
    }

    @DeleteMapping("/remove-item/{cartItemId}")
    public void removeItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
    }

    @DeleteMapping("/clear/{cartId}")
    public void clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
    }
}
