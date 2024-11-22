import React from "react";
import CartItem from "./CartItem";

function CartDetail({data, onRemove, onUpdate}) {
    return (
        <div className="pt-8">
            {data.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onRemove={onRemove}
                    onUpdateQuantity={onUpdate}
                />
            ))}
        </div>
    );
}

export default CartDetail;