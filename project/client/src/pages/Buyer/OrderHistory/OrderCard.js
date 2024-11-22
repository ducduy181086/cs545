import React from "react";
import OrderStatus from "./OrderStatus";

function OrderCard(order, handleOnItemClick) {

    return (
        <button className="w-full border rounded-lg p-4 shadow-sm mb-4 bg-white" onClick={() => { handleOnItemClick(order.id) }}>
            <div className="flex border-b mt-2 pb-2">
                <p className="text-md font-bold"> # {order.id} - {new Date(order.orderDate).toLocaleDateString()}</p>
                <div className="ml-auto">{OrderStatus(order.status)}</div>
            </div>
            <div className="flex items-center mt-4 mb-4">
                {
                    order.items.map((item) => (
                        <div key={item.id} className="flex flex-col items-center w-120 p-4">
                            <img className="w-32 h-32 object-cover" src={item.product.imageUrl} alt="Product Image" />
                            <p className="mt-2 mb-4 text-sm text-center truncate" style={{ maxWidth: '150px' }}>
                                {item.product.name.length > 10 ? item.product.name.slice(0, 10) + '...' : item.product.name}
                            </p>
                        </div>
                    ))
                }

            </div>
        </button>
    );
};

export default OrderCard;