import React from "react";
import ProductReviewModal from "components/common/ProductReviewModel";

export default function OrderProductCard({product, onSubmitReview, onViewDetail}) {

    return (
        <>
            <div className="w-full border p-4 rounded-md">
                <div className="flex items-center w-full justify-between ">
                    <div className="flex items-center">
                        <img src="https://via.placeholder.com/80" alt="Product Image" className="w-16 h-16 object-cover rounded-lg" />
                        <div className="ml-4">
                            <p className="font-bold">{product.productName}</p>
                            <p className="text-gray-500">Quantity: {product.quantity}</p>
                        </div>

                    </div>

                    <div className="items-center">
                        <p className="text-sm text-gray-500">${product.price}</p>
                        <p className="font-bold text-blue-500">${product.totalPrice}</p>
                    </div>
                </div>
                <ProductReviewModal product={product} onSubmitReview={onSubmitReview} onViewDetail={onViewDetail} />
            </div>
        </>
    );
}