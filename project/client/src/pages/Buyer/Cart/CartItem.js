import React, { useState } from "react";

const CartItem = ({ product, onRemove, onUpdateQuantity }) => {
    const [quantity, setQuantity] = useState(product.qty ?? 1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        onUpdateQuantity(product.id, event.target.value)
    };

    return (
        <div className="flex items-center border rounded-lg p-4 shadow-sm mb-4 bg-white">
            {/* Product Image */}
            <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-md"
            />

            {/* Product Details */}
            <div className="flex-1 ml-4">
                <h3 className="text-md font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500">Condition:</p>
                <p className="text-sm text-gray-500">Comes with:</p>
                <a
                    href={product.warrantyLink}
                    className="text-blue-500 hover:underline text-sm"
                >
                    {product.warranty}
                </a>
                <p className="text-md font-bold mt-2">${product.price.toFixed(2)}</p>
            </div>

            {/* Quantity Selector and Actions */}
            <div className="text-right ml-4">
                {/* Quantity Selector */}
                <select
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border rounded-md px-2 py-1 text-sm mb-2 mr-4"
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>

                {/* Remove Button */}
                <button
                    onClick={() => onRemove(product.id)}
                    className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-600 hover:text-white"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;