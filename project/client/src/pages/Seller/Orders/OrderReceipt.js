import React from "react";

const OrderReceipt = (props) => {
  const { order } = props;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-50">
      <h2 className="text-2xl font-bold text-gray-800">Order Receipt</h2>
      <p className="mt-2 text-gray-600">
        <strong>Order ID:</strong> {order.id}
      </p>
      <p className="text-gray-600">
        <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        <strong>Status:</strong> {order.status}
      </p>
      <hr className="my-4" />

      {/* Customer Information */}
      <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
      <p className="text-gray-600">
        <strong>Customer Name:</strong> {order.customerName || "N/A"}
      </p>
      <p className="text-gray-600">
        <strong>Shipping Address:</strong> {order.shippingAddress}
      </p>
      <p className="text-gray-600">
        <strong>Shipping Phone:</strong> {order.shippingPhone}
      </p>
      <p className="text-gray-600">
        <strong>Billing Address:</strong> {order.billingAddress}
      </p>
      <p className="text-gray-600">
        <strong>Billing Phone:</strong> {order.billingPhone}
      </p>
      <hr className="my-4" />

      {/* Products Table */}
      <h3 className="text-lg font-semibold text-gray-800">Products</h3>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 text-sm text-gray-800">{item.product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
              <td className="px-6 py-4 text-sm text-gray-600">${item.product.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="my-4" />

      {/* Totals */}
      <div className="flex justify-end mt-4">
        <table>
          <tbody>
            <tr>
              <td className="pr-6 py-2 text-right font-semibold text-gray-800">Subtotal:</td>
              <td className="py-2 text-gray-900">${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="pr-6 py-2 text-right font-semibold text-gray-800">Discount:</td>
              <td className="py-2 text-gray-900">-${order.totalDiscount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="pr-6 py-2 text-right font-semibold text-gray-800">Tax:</td>
              <td className="py-2 text-gray-900">${order.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="pr-6 py-2 text-right font-bold text-gray-800">Total:</td>
              <td className="py-2 text-gray-900 font-bold">${order.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderReceipt;
