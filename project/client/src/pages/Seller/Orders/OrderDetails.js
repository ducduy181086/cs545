import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { sellerCancelOrder, sellerFetchOrderById, sellerUpdateOrderStatus } from "services/sellerService";
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

    const updateOrderStatus = async () => {
        await sellerUpdateOrderStatus(order.id, newStatus.toUpperCase())
        setOrder({ ...order, status: newStatus });
        setShowDialog(false);
    };

    const cancelOrder = async () => {
        await sellerCancelOrder(order.id)
        setOrder({ ...order, status: 'CANCELLED' });

    }

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
                        {order && <div>
                            <button
                                className={`px-4 py-2 text-white ${order.status === 'CANCELLED' ? "bg-gray-500" : "bg-blue-600"
                                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                disabled={order.status === 'CANCELLED'}
                                onClick={() => setShowDialog(true)}
                            >
                                Change Status
                            </button>
                            <button
                                className={`ms-3 px-4 py-2 text-white ${order.status === 'CANCELLED' ? "bg-gray-500" : "bg-indigo-600"
                                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                disabled={order.status === 'CANCELLED'}
                                onClick={() => handlePrint()}
                            >
                                Print Order
                            </button>
                            <button
                                className={`ms-3 px-4 py-2 text-white ${(order.status === 'CANCELLED' || order.status === 'DELIVERED')? "bg-gray-500" : "bg-red-600"
                                    } rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                                disabled={order.status === 'CANCELLED' || order.status === 'DELIVERED'}
                                onClick={cancelOrder}
                            >
                                Cancel Order
                            </button>
                        </div>}
                    </div>
                </header>
                <main>
                    <div className="min-h-screen bg-gray-100">
                        {/* Content */}
                        {order && (
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Order Information */}
                                            <div className="bg-white shadow-md rounded-lg p-6">
                                                <h2 className="text-xl font-semibold text-gray-800">Order Information</h2>
                                                <div className="mt-4">
                                                    <p className="text-gray-600">
                                                        <strong>Order ID:</strong> {order.id}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Order Date:</strong>{" "}
                                                        {new Date(order.orderDate).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Delivery Date:</strong>{" "}
                                                        {new Date(order.orderDate).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Status:</strong>{" "}
                                                        <span
                                                            className={`px-2 py-1 rounded text-white ${order.status === "PENDING"
                                                                ? "bg-yellow-500"
                                                                : order.status === "SHIPPED"
                                                                    ? "bg-blue-500"
                                                                    : order.status === "CANCELLED"
                                                                        ? "bg-red-500"
                                                                        : "bg-green-500"
                                                                }`}
                                                        >
                                                            {order.status.toUpperCase()}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Payment Information */}
                                            <div className="bg-white shadow-md rounded-lg p-6">
                                                <h2 className="text-xl font-semibold text-gray-800">Payment Information</h2>
                                                <div className="mt-4">
                                                    <p className="text-gray-600">
                                                        <strong>Payment Method:</strong> {order.paymentType}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Total Amount:</strong> ${order.total}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Shipping Information */}
                                            <div className="bg-white shadow-md rounded-lg p-6">
                                                <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
                                                <div className="mt-4">
                                                    <p className="text-gray-600">
                                                        <strong>Customer Name:</strong> {order.customerName || "N/A"}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Shipping Address:</strong> {order.shippingAddress}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Shipping Phone:</strong> {order.shippingPhone}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Billing Information */}
                                            <div className="bg-white shadow-md rounded-lg p-6">
                                                <h2 className="text-xl font-semibold text-gray-800">Billing Information</h2>
                                                <div className="mt-4">
                                                    <p className="text-gray-600">
                                                        <strong>Billing Address:</strong> {order.billingAddress}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <strong>Billing Phone:</strong> {order.billingPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
                                                        Image
                                                    </th>
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
                                                    <tr key={item.id}>
                                                        <td className="px-6 py-4 text-sm text-gray-800">
                                                            <img
                                                                src={item.product.imageUrl ?? 'https://via.placeholder.com/180x160'}
                                                                alt={item.product.name}
                                                                className="mt-4 max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] object-cover rounded-md"
                                                            />
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">
                                                            {item.product.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            ${item.product.price}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                                                            ${item.product.price * item.quantity}
                                                            {/* ${item.totalPrice.toFixed(2)} */}
                                                        </td>

                                                    </tr>
                                                ))}
                                                {/* Subtotal Row */}
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                                                        Subtotal:
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                        ${order.subtotal.toFixed(2)}
                                                    </td>
                                                </tr>
                                                {/* Total Discount Row */}
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                                                        Discount:
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                        -${order.totalDiscount.toFixed(2)}
                                                    </td>
                                                </tr>
                                                {/* Tax Row */}
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                                                        Tax:
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                        ${order.tax.toFixed(2)}
                                                    </td>
                                                </tr>
                                                {/* Total Row */}
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                                                        Total:
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                        ${order.total.toFixed(2)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                            <option value="PENDING">PENDING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
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