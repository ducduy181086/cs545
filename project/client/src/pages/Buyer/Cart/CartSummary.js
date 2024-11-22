import React  from "react";

import { useNavigate } from 'react-router-dom';

const CartSummary = ({ data }) => {

  const navigate = useNavigate();

  if(!data){
    return <div>.</div>
  }

  const calculateSubtotal = () =>
    data.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const calculateTotalDiscount = () =>
    data.reduce((total, item) => total + (item.product.price * item.product.discount / 100) * item.quantity, 0);
  const tax = () => calculateSubtotal() * 5.5 / 100;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateTotalDiscount();
    const taxAmount = tax();
    return (subtotal - discount + taxAmount).toFixed(2);
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8 ">
      {/* Item List */}
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-4"
          >
            {/* Item Image and Details */}
            <div className="flex items-center space-x-4">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-semibold line-clamp-2">{item.product.name}</p>
                <p className="text-sm text-gray-500">Shipping: Free</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            {/* Item Price */}
            <div>
              <p className="text-sm font-semibold">${item.product.price.toFixed(2)}</p>
              <span className="text-sm line-through text-gray-500">
                ${(item.product.price + (item.product.discount * item.product.price) / 100).toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary Section */}
      <div className="mt-6 border-t pt-4 pb-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Discount</span>
          <span>-{calculateTotalDiscount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping Fee</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Estimated taxes</span>
          <span>${tax().toFixed(2)}</span>

        </div>
        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>

      {/* Checkout Button */}
      {window.location.pathname === '/cart' &&
        <button className="w-full bg-black text-white py-3 mt-6 rounded-md hover:bg-gray-800" onClick={() => navigate('/shipping/confirmation-address')}>
          Continue to checkout
        </button>
      }
    </div>
  );
};

export default CartSummary;