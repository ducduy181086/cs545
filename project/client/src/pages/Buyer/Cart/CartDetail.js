import React from "react";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function CartDetail({data, onRemove, onUpdate}) {
    if (!data || data.length === 0) {
        return (
            <EmptyCart />
        );
    }
    return (
        <div className="pt-8">
            {data?.map((item) => (
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