import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const CartSummary = () => {
  const { cart } = useContext(CartContext);
  
  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-12 ml-4 mr-4">
      {/* Item List */}
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-4"
          >
            {/* Item Image and Details */}
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-semibold line-clamp-2">{item.title}</p>
                <p className="text-sm text-gray-500">Shipping: Free</p>
                <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
              </div>
            </div>
            {/* Item Price */}
            <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>

      {/* Summary Section */}
      <div className="mt-6 border-t border-b pt-4 pb-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Quality Assurance Fee</span>
          {/* <span>${fees.qualityFee.toFixed(2)}</span> */}
          <span>120.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Estimated taxes</span>
          {/* <span>${fees.taxes.toFixed(2)}</span> */}
          <span>500</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Total</span>
          {/* <span>${calculateTotal().toFixed(2)}</span> */}
          <span>500.12</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-black text-white py-3 mt-6 rounded-md hover:bg-gray-800">
        Continue to checkout
      </button>
    </div>
  );
};

export default CartSummary;