// CartContext.js
import { createContext, useState } from 'react';

// Create a Context for the cart
export const ShippingContext = createContext();

// CartProvider component to provide context to the rest of the app
export const ShippingProvider = ({ children }) => {
    const key = 'shippingInfo';
    // State to hold cart items
    const [shippingInfo, setShippingInfo] = useState(JSON.parse(localStorage.getItem(key)));

    // Function to add shipping info
    const updateShippingInfo = (shippingInfo) => {
        setShippingInfo(shippingInfo);
        localStorage.setItem(key, JSON.stringify(shippingInfo));
    };

    // Function to add billing info
    const updateBillingInfo = (shippingInfo) => {
        setShippingInfo(shippingInfo);
        localStorage.setItem(key, JSON.stringify(shippingInfo));
    };

    // Function to clear the shipping info
    const clearShippingInfo = () => {
        setShippingInfo(null);
        localStorage.removeItem(key);
    };

    return (
        <ShippingContext.Provider value={{ shippingInfo, updateShippingInfo, updateBillingInfo, clearShippingInfo }}>
            {children}
        </ShippingContext.Provider>
    );
};
