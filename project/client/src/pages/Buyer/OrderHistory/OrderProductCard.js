import React from "react";
import ProductReviewModal from "components/common/ProductReviewModel";
import { formatMoney } from "utils/utils";

export default function OrderProductCard({ product: item, onSubmitReview, onViewDetail }) {
    return (
        <>
            <div className="w-full bg-white border p-4 rounded-md">
                <div className="flex items-center w-full justify-between mb-4">
                    <div className="flex items-center">
                        <img src={item.product.imageUrl} alt="Product Image" className="w-20 h-20 object-cover rounded-lg" />
                        <div className="ml-4">
                            <p className="font-bold">{item.product.name}</p>
                            <p className="text-gray-500">Quantity: {item.product.quantity}</p>
                        </div>

                    </div>

                    <div className="items-center">
                        <p className="text-sm text-gray-500">${formatMoney(item.product.price)}</p>
                        <p className="text-sm line-through text-gray-500">${formatMoney((item.product.price - item.product.price * (100 - item.product.discount) / 100) * item.product.quantity)}</p>
                        <p className="mt-2 font-bold text-blue-500">${formatMoney(item.product.price * item.product.quantity)}</p>
                    </div>
                </div>
                <ProductReviewModal product={item.product} onSubmitReview={onSubmitReview} onViewDetail={onViewDetail} />
            </div>
        </>
    );
}