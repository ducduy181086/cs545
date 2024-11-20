import { html2pdf } from "html2pdf.js";
import React, { useRef } from "react";

const OrderReceipt = (props) => {

  const { order } = props
  const receiptRef = useRef(); // Ref to target the receipt for PDF generation

  // const handleDownloadPDF = () => {
  //   const element = receiptRef.current;
  //   const options = {
  //     margin: 1,
  //     filename: `order_${order.orderId}_receipt.pdf`,
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //   };
  //   html2pdf().set(options).from(element).save();
  // };

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
    const printContent = receiptRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Receipt Content */}
          <div ref={receiptRef} className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Order Receipt
            </h2>
            <p className="mt-2 text-gray-600">
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {order.status}
            </p>
            <hr className="my-4" />

            {/* Customer Information */}
            <h3 className="text-lg font-semibold text-gray-800">
              Customer Information
            </h3>
            <p className="text-gray-600">
              <strong>Name:</strong> {order.customer.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {order.customer.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {order.customer.phone}
            </p>
            <p className="text-gray-600">

              <strong>Address:</strong>{" "}
              {`${order.customer.address.street}, ${order.customer.address.city}, ${order.customer.address.state}, ${order.customer.address.zipcode}, ${order.customer.address.country}`}

            </p>
            <hr className="my-4" />

            {/* Products Table */}
            <h3 className="text-lg font-semibold text-gray-800">
              Products
            </h3>
            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      ${item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-4" />

            {/* Total Amount */}
            <div className="flex justify-end">
              <p className="text-xl font-semibold text-gray-800">
                Total: ${order.payment.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
