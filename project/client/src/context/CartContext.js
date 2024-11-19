// CartContext.js
import mock from 'mockData/mock';
import { createContext, useState } from 'react';

// Create a Context for the cart
export const CartContext = createContext();

// CartProvider component to provide context to the rest of the app
export const CartProvider = ({ children }) => {
    // State to hold cart items
    const [cart, setCart] = useState(mock.cartItems);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    // Update the quantity of an item
    const updateQuantity = (itemId, quantity) => {
        console.log(itemId, quantity);
        if (quantity < 1) return; // Avoid setting quantity less than 1

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
