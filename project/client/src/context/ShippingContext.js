// CartContext.js
import { createContext, useState } from 'react';

// Create a Context for the cart
export const ShippingContext = createContext();

// CartProvider component to provide context to the rest of the app
export const ShippingProvider = ({ children }) => {
    // State to hold cart items
    const [shippingInfo, setShippingInfo] = useState(null);

    // Function to add shipping info
    const updateShippingInfo = (shippingInfo) => {
        setShippingInfo(shippingInfo);
    };

    // Function to add billing info
    const updateBillingInfo = (shippingInfo) => {
        setShippingInfo(shippingInfo);
    };

    // Function to clear the shipping info
    const clearShippingInfo = () => {
        setShippingInfo(null);
    };

    return (
        <ShippingContext.Provider value={{ shippingInfo, updateShippingInfo, updateBillingInfo, clearShippingInfo }}>
            {children}
        </ShippingContext.Provider>
    );
};
