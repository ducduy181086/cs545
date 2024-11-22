import React, { useState } from "react";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {

    const [quantity, setQuantity] = useState(item.quantity ?? 1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        onUpdateQuantity(product.id, event.target.value)
    };

    const product = item.product;

    const options = Array.from({ length: product.quantity ?? 0 }, (_, index) => index + 1);

    return (
        <div className="flex items-center border rounded-lg p-4 shadow-sm mb-4 bg-white">
            {/* Product Image */}
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
            />

            {/* Product Details */}
            <div className="flex-1 ml-4">
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">Size: {item.size ?? ''}</p>
                <p className="text-sm text-gray-500">Color: {item.color ?? ''}</p>
                <div className="flex">

                    <span className="text-md font-medium ">${product.price.toFixed(2)}</span>
                    <span className="text-md line-through text-gray-500 ml-4">
                        ${(product.price + (product.discount * product.price) / 100).toFixed(2)}
                    </span>

                </div>

            </div>

            {/* Quantity Selector and Actions */}
            <div className="text-right ml-4">
                {/* Quantity Selector */}
                <select
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border rounded-md px-2 py-1 text-sm mb-2 mr-4"
                >
                    {options.map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>

                {/* Remove Button */}
                <button
                    onClick={() => onRemove(item.id)}
                    className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-600 hover:text-white"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;