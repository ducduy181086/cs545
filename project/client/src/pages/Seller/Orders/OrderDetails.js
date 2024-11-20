import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { sellerFetchOrderById } from "services/sellerService";
import SellerHeader from "../SellerHeader";
import OrderReceipt from "./OrderReceipt";

const OrderDetail = (props) => {

    const [order, setOrder] = useState();

    const [showDialog, setShowDialog] = useState(false);
    const [newStatus, setNewStatus] = useState(order?.status);
    const receiptRef = useRef(); // Ref for the receipt to generate PDF

    const param = useParams();

    useEffect(() => {
        console.log('pramid = ', param.id)
        sellerFetchOrderById(param.id).then((res) => {
            setOrder(res)
            setNewStatus(res.status)
            console.log('res = ', res)
        })
    }, [])

    const updateOrderStatus = () => {
        setOrder({ ...order, status: newStatus });
        setShowDialog(false);
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
        printWindow.print();
    };

    return (
        <>
            <div className="min-h-full">
                <SellerHeader />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex item-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order Details of ID: {param.id}</h1>
                        <div>
                            <button
                                className="me-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
                                onClick={() => setShowDialog(true)}
                            >
                                Change Status
                            </button>
                            <button className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                onClick={() => handlePrint()}
                            >
                                Print Order
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="min-h-screen bg-gray-100">
                        {/* Content */}
                        {order && (
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    {/* Order Information */}
                                    <h2 className="text-xl font-semibold text-gray-800">Order Information</h2>
                                    <div className="mt-4">
                                        <p className="text-gray-600">
                                            <strong>Order ID:</strong> {order.orderId}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Order Date:</strong>{" "}
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Delivery Date:</strong>{" "}
                                            {new Date(order.deliveryDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={`px-2 py-1 rounded text-white ${order.status === "Pending"
                                                    ? "bg-yellow-500"
                                                    : order.status === "Shipped"
                                                        ? "bg-blue-500"
                                                        : order.status === "Cancelled"
                                                            ? "bg-red-500"
                                                            : "bg-green-500"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Customer Information */}
                                    <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                        Customer Information
                                    </h2>
                                    <div className="mt-4">
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
                                    </div>

                                    {/* Products Table */}
                                    <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                        Products
                                    </h2>
                                    <div className="mt-4 overflow-hidden border rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 bg-white">
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
                                    </div>

                                    {/* Payment Information */}
                                    <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                        Payment Information
                                    </h2>
                                    <div className="mt-4">
                                        <p className="text-gray-600">
                                            <strong>Payment Method:</strong> {order.payment.method}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Transaction ID:</strong> {order.payment.transactionId}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Total Amount:</strong> ${order.payment.totalAmount}{" "}
                                            {order.payment.currency}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showDialog && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                                    <h3 className="text-lg font-semibold text-gray-800">Change Order Status</h3>
                                    <div className="mt-4">
                                        <select
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-4">
                                        <button
                                            onClick={() => setShowDialog(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={updateOrderStatus}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hidden Receipt for Printing/Downloading */}
                        {order && <div className="hidden">
                            <div ref={receiptRef}>
                                <OrderReceipt order={order} />
                            </div>
                        </div>}
                    </div>
                </main>
            </div>
        </>
    );
};

export default OrderDetail;