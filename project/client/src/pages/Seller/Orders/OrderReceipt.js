import { html2pdf } from "html2pdf.js";
import React, { useRef } from "react";

const OrderReceipt = (props) => {
  const { order } = props;
  const receiptRef = useRef(); // Ref to target the receipt for PDF generation

  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    const options = {
      margin: 1,
      filename: `order_${order.orderId}_receipt.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };
  const handlePrint = () => {
    const printContent = receiptRef.current;

    if (!printContent) {
      console.error("Receipt content not found!");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for styles to load before printing
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };
  //   return (
  //     <div className="min-h-screen bg-gray-100">
  //       <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
  //         <div className="bg-white shadow-md rounded-lg p-6">
  //           {/* Receipt Content */}
  //           <div ref={receiptRef} className="p-6">
  //             <h2 className="text-2xl font-bold text-gray-800">Order Receipt</h2>
  //             <p className="mt-2 text-gray-600">
  //               <strong>Order ID:</strong> {order.orderId}
  //             </p>
  //             <p className="text-gray-600">
  //               <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
  //             </p>
  //             <p className="text-gray-600">
  //               <strong>Status:</strong> {order.status}
  //             </p>
  //             <hr className="my-4" />

  //             {/* Customer Information */}
  //             <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
  //             <p className="text-gray-600">
  //               <strong>Name:</strong> {order.customerName || "N/A"}
  //             </p>
  //             <p className="text-gray-600">
  //               <strong>Billing Address:</strong>{" "}
  //               {`${order.billingAddress || ""}`}
  //             </p>
  //             <hr className="my-4" />

  //             {/* Products Table */}
  //             <h3 className="text-lg font-semibold text-gray-800">Products</h3>
  //             <table className="min-w-full divide-y divide-gray-200 mt-4">
  //               <thead className="bg-gray-50">
  //                 <tr>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
  //                     Product
  //                   </th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
  //                     Quantity
  //                   </th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
  //                     Price
  //                   </th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
  //                     Total
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody className="divide-y divide-gray-200">
  //                 {order.items.map((item) => (
  //                   <tr key={item.productId}>
  //                     <td className="px-6 py-4 text-sm text-gray-800">{item.productName}</td>
  //                     <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
  //                     <td className="px-6 py-4 text-sm text-gray-600">${item.product.price.toFixed(2)}</td>
  //                     <td className="px-6 py-4 text-sm text-gray-800 font-medium">
  //                       ${(item.quantity * item.price).toFixed(2)}
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //             <hr className="my-4" />

  //             {/* Payment Summary */}
  //             <div className="mt-4">
  //               <p className="text-gray-600">
  //                 <strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}
  //               </p>
  //               <p className="text-gray-600">
  //                 <strong>Tax:</strong> ${order.tax.toFixed(2)}
  //               </p>
  //               <p className="text-gray-600">
  //                 <strong>Discount:</strong> -${order.total.toFixed(2)}
  //               </p>
  //               <p className="text-xl font-semibold text-gray-800">
  //                 Total: ${order.total.toFixed(2)}
  //               </p>
  //             </div>
  //           </div>

  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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
        {/* Actions */}
      </div>
    </div>
  );
};

export default OrderReceipt;
