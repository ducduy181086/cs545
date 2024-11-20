import React, { useState } from "react";
import Pagination from "components/Pagination";
import { useNavigate } from "react-router";


const OrderTable = (props) => {

    const navigate = useNavigate();
    const { ordersData } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const totalPages = Math.ceil(ordersData.length / ordersPerPage);

    const startIndex = (currentPage - 1) * ordersPerPage;
    const currentOrders = ordersData.slice(startIndex, startIndex + ordersPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // const handleCancelOrder = (orderId) => {
    //     const updatedOrders = orders.map((order) =>
    //         order.orderId === orderId
    //             ? { ...order, status: "Cancelled" }
    //             : order
    //     );
    //     setOrders(updatedOrders);
    // };

    // const handleStatusChange = (orderId, newStatus) => {
    //     const updatedOrders = orders.map((order) =>
    //         order.orderId === orderId
    //             ? { ...order, status: newStatus }
    //             : order
    //     );
    //     setOrders(updatedOrders);
    // };

    const handleViewDetail = (orderId) => {
        console.log('handleViewDetail of id: ', orderId)
        navigate(`${orderId}`);
    }
    return (
        <>

            <div className="overflow-hidden border rounded-lg shadow-sm bg-white mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentOrders.map((order) => (
                            <tr key={order.orderId}
                                onClick={() => handleViewDetail(order.orderId)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-900">{order.orderId}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.customer.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                                {/* <td className="px-6 py-4 text-sm text-gray-500">

                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                        className="border rounded px-2 py-1 mr-2"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="On the way">On the way</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td> */}
                                <td className="px-6 py-4 text-sm text-gray-500">{order.status}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">${order.payment.totalAmount.toFixed(2)}</td>
                                {/* <td className="px-6 py-4 text-sm text-gray-500">
                                    {order.status === "Pending" ? <button
                                        onClick={
                                            order.status === "Pending" ?
                                                () =>
                                                    handleCancelOrder(order.orderId) : undefined}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Cancel
                                    </button>
                                        : <label>Cancel</label>}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>

    );
};

export default OrderTable;