import React from "react";
import OrderStatus from "./OrderStatus";

function OrderCard(order, handleOnItemClick) {

    return (
        <button className="w-full border rounded-lg p-4 shadow-sm mb-4 bg-white" onClick={() => { handleOnItemClick(order.orderId) }}>
            <div className="flex border-b mt-2 pb-2">
                <p className="text-md font-bold"> # {order.orderId} - {new Date(order.deliveryDate).toLocaleDateString()}</p>
                <div className="ml-auto">{OrderStatus(order.status)}</div>
            </div>
            <div className="flex items-center mt-4 mb-4">
                {
                    order.items.map((product) => (
                        <div key={product.productId} className="flex flex-col items-center w-120 p-4">
                            <img src="https://via.placeholder.com/80" alt="Product Image" />
                            <p className="mt-2 mb-4 text-sm text-center truncate" style={{ maxWidth: '150px' }}>
                                {product.productName.length > 10 ? product.productName.slice(0, 10) + '...' : product.productName}
                            </p>
                        </div>
                    ))
                }

            </div>
        </button>
    );
};

export default OrderCard;