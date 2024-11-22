package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Buyer;
import edu.miu.cs545.project.server.entity.Cart;
import edu.miu.cs545.project.server.entity.CartItem;
import edu.miu.cs545.project.server.entity.dto.CartDto;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.BuyerRepo;
import edu.miu.cs545.project.server.repository.CartItemRepo;
import edu.miu.cs545.project.server.repository.CartRepo;
import edu.miu.cs545.project.server.repository.ProductRepo;
import edu.miu.cs545.project.server.service.CartService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final ModelMapper modelMapper;
    private final CartRepo cartRepo;
    private final CartItemRepo cartItemRepo;
    private final BuyerRepo buyerRepo;
    private final ProductRepo productRepo;

    @Override
    public CartDto getCart() {
        var buyer = getCurrentBuyer();
        if (buyer.isPresent()) {
            var buyerId = buyer.get().getId();
            var cart = cartRepo.findByBuyerId(buyerId);
            return cart.map(value -> modelMapper.map(value, CartDto.class)).orElse(null);
        }
        return null;
    }

    @Override
    public CartDto addItemToCart(Long productId, int quantity, String size, String color) {
        var buyer = getCurrentBuyer();
        if (buyer.isEmpty()) return null;
        var buyerId = buyer.get().getId();
        var cart = cartRepo.findByBuyerId(buyerId);
        Cart cartEntity;
        if (cart.isEmpty()) {
            var cartNew = new Cart();
            buyerRepo.findById(buyerId).ifPresent(cartNew::setBuyer);
            cartEntity = cartRepo.save(cartNew);
        }
        else { cartEntity = cart.get(); }

        CartItem cartItem = new CartItem();
        cartItem.setCart(cartEntity);
        productRepo.findById(productId).ifPresent(cartItem::setProduct);
        cartItem.setQuantity(quantity);
        cartItem.setSize(size);
        cartItem.setColor(color);
        cartItemRepo.save(cartItem);

        return modelMapper.map(cartRepo.findById(cartEntity.getId()).orElseThrow(), CartDto.class);
    }

    @Override
    public void updateCartItem(Long cartItemId, int quantity, String size, String color) {
        CartItem cartItem = cartItemRepo.findById(cartItemId).orElseThrow();
        cartItem.setQuantity(quantity);
        if (size != null) cartItem.setSize(size);
        if (color != null) cartItem.setColor(color);
        cartItemRepo.save(cartItem);
    }

    @Override
    public void removeCartItem(Long cartItemId) {
        cartItemRepo.deleteById(cartItemId);
    }

    @Transactional
    @Override
    public void clearCart(Long cartId) {
        Cart cart = cartRepo.findById(cartId).orElseThrow();
        for (var item : cart.getItems()) {
            cartItemRepo.deleteById(item.getId());
        }
        cart.getItems().clear();
        cartRepo.save(cart);
        cartItemRepo.flush();
    }

    private Optional<Buyer> getCurrentBuyer() {
        String username = UserHelper.getCurrentUserName();
        return buyerRepo.findBuyerByEmail(username);
    }
}
