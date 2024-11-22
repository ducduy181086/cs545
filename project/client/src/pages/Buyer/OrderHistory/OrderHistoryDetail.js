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

                        <div className="mt-8"></div>
                        {order && order.items.map((product) => <div key={product.id} className="pt-2 pb-2"> <OrderProductCard product={product} onSubmitReview={handleSubmitReview} onViewDetail={handleViewDetail} /> </div>)}

                        <div className="flex  border-b mt-2 pb-2">
                            <div>
                                <div className="ml-auto mt-4 border-b pb-2">Order date: {formatDateTime(order.orderDate)} </div>
                                <div className="ml-auto mt-4">Transaction Id: {order.buyerEmail} </div>
                                <div className="ml-auto ">Payment Method: {order.paymentType}</div>
                                <div className="ml-auto ">Payment Status: {order.paymentStatus}</div>
                                <div className="ml-auto border-b pb-1 mb-2 ">Email: {order.buyerEmail}</div>
                                <div className="ml-auto ">Shipping Phone: {order.shippingPhone}</div>
                                <div className="ml-auto ">Shipping Address: {order.shippingAddress}</div>
                                <div className="ml-auto ">Billing Phone: {order.billingPhone}</div>
                                <div className="ml-auto ">Shipping Address: {order.billingAddress}</div>

                                <div className="ml-auto mt-2 font-semibold">Sub total: {formatMoney(order.subtotal)} </div>
                                <div className="ml-auto font-semibold">Total discount: {formatMoney(order.totalDiscount)}</div>
                                <div className="ml-auto  font-semibold">Tax: {formatMoney(order.tax)}</div>
                                <div className="ml-auto  font-semibold">Total amount: {formatMoney(order.total)} </div>
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
