import React, { useState } from "react";

const ProductQuantity = ({ max = 3 }) => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < max)
            setQuantity(quantity + 1);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <button
                    onClick={handleDecrease}
                    className="text-lg px-2 py-1 rounded-full hover:bg-gray-200"
                    aria-label="Decrease Quantity"
                >
                    −
                </button>
                <span className="mx-4 text-lg">{quantity}</span>
                <button
                    onClick={handleIncrease}
                    className="text-lg px-2 py-1 rounded-full hover:bg-gray-200"
                    aria-label="Increase Quantity"
                >
                    +
                </button>
            </div>

            {/* Stock Info */}
            <p className="text-sm text-gray-500">Maximum {max} {max > 1 ? 'products' : 'product'} </p>

            {/* Add to Cart Button */}
            <button
                className="bg-black text-white w-full max-w-sm py-3 rounded-full text-center font-semibold hover:bg-gray-800"
            >
                ADD TO CART
            </button>
        </div>
    );
};

export default ProductQuantity;
