import React, { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../../context/CartContext";
import EmptyCart from "./EmptyCart";

function CartDetail() {
    
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <EmptyCart />
        );
    }
    return (
        <div className="pt-12">
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    product={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                />
            ))}
        </div>
    );
}

export default CartDetail;