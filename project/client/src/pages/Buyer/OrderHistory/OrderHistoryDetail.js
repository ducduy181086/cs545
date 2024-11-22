import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from "services/orderService";
import OrderProductCard from "./OrderProductCard";
import OrderStatus from "./OrderStatus";
import Header from "components/layout/Header";
import { submitReview } from "services/reviewService";
import { formatDateTime, formatMoney } from "utils/utils";
import SuccessDialog from "components/layout/SuccessDialog";
import Footer from 'components/layout/Footer';

const OrderHistoryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const receiptRef = useRef();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        fetchOrderById(id).then(res => {
            setOrder(res);
        });
    }, [id])

    const handlePrint = () => {
        const printContent = receiptRef.current.innerHTML;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <html>
            <head>
              <title>Order Receipt</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handleSubmitReview = (productId, rating, reviewText) => {
        const content = {
            "productId": productId,
            "content": reviewText,
            "rating": rating
        }

        submitReview(productId, content).then(res => {
            handleOpenDialog();
        });
    };

    const handleViewDetail = (productId) => {
        navigate(`/products/${productId}`);
    };


    if (!order) return (<>   </>);

    return (
        < div className="flex flex-col min-h-screen" ref={receiptRef}>
            {/* {Header component} */}
            <Header />

            {/* {Body component} */}
            <div className="flex-grow px-20 p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="md:col-span-4 ml-4 me-4 mt-4">
                        <div className="flex border-b mt-2 pb-2">
                            <p className="text-md font-bold">Order detail # {order.orderId} - {new Date(order.orderDate).toLocaleDateString()} - {order.items.length} {order.items.length > 1 ? 'items' : 'item'}</p>
                            <div className="ml-auto">{OrderStatus(order.status)}
                            </div>
                        </div>
                        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
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
                                            <strong>Total Amount:</strong> ${order?.total?.toFixed(2)}
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

                        <div className="mt-8"></div>
                        {order && order.items.map((product) =>
                            <div key={product.id} className="pt-2 pb-2">
                                <OrderProductCard
                                    key={product.id}
                                    product={product}
                                    onSubmitReview={handleSubmitReview}
                                    onViewDetail={handleViewDetail} />
                            </div>)}
                       <div className="border-b mt-2 pb-2">
                            <div className="flex flex-col bg-white shadow-md rounded-lg p-6 space-y-4 items-end">
                                {/* Subtotal Row */}
                                <div className="flex justify-between w-full max-w-xs">
                                    <span className="text-sm font-semibold text-gray-800">Subtotal:</span>
                                    <span className="text-sm font-bold text-gray-900">${order.subtotal.toFixed(2)}</span>
                                </div>

                                {/* Total Discount Row */}
                                <div className="flex justify-between w-full max-w-xs">
                                    <span className="text-sm font-semibold text-gray-800">Discount:</span>
                                    <span className="text-sm font-bold text-red-600">-${order.totalDiscount.toFixed(2)}</span>
                                </div>

                                {/* Tax Row */}
                                <div className="flex justify-between w-full max-w-xs">
                                    <span className="text-sm font-semibold text-gray-800">Tax:</span>
                                    <span className="text-sm font-bold text-gray-900">${order.tax.toFixed(2)}</span>
                                </div>

                                {/* Total Row */}
                                <div className="flex justify-between w-full max-w-xs">
                                    <span className="text-sm font-semibold text-gray-800">Total:</span>
                                    <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="ml-auto">
                                {order && order.status === 'DELIVERED' && <span className="material-symbols-outlined text-8xl text-blue-200">
                                    receipt_long
                                </span>}
                            </div>
                        </div>

                        <div className="flex mt-12 justify-center">
                            {order && order.status === 'DELIVERED' && <button className="bg-blue-500 ps-8 pe-8 text-white rounded-full p-2 hover:bg-blue-600 mr-4" onClick={handlePrint}>
                                Print receipt
                            </button>}

                            {order && order.status === 'PENDING' && <button className="bg-red-500 ps-8 pe-8 text-white rounded-full p-2 hover:bg-red-600">
                                Cancel order
                            </button>}


                        </div>
                    </div>
                </div>
            </div>

            {/* {Footer component} */}
            <Footer className="mt-12" />

            {/* {SuccessDialog component} */}
            <SuccessDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                title='Review Submitted!'
                message='Thank you for your feedback.' />
        </div>
    );
};

export default OrderHistoryDetail;
