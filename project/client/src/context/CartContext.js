
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [counter, setCounter] = useState(0);

    const updateCounter = (count) => {
        setCounter(count);
    };

    const clearCounter = () => {
        setCounter(0);
    };

    return (
        <CartContext.Provider value={{ counter, updateCounter, clearCounter }}>
            {children}
        </CartContext.Provider>
    );
};
