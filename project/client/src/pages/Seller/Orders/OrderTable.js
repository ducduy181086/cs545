import React, { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { useNavigate } from "react-router";
import { sellerFetchOrders } from "services/sellerService";
import Loading from "components/layout/Loading";


const OrderTable = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState()
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true)
        sellerFetchOrders((currentPage ?? 1) - 1)
            .then(res => {
                setOrders(res);
            }).catch(err => {
                setError(true)
            }).finally(() => {
                setLoading(false)
            });
    }, [currentPage])

    if (error || loading) {
        return <Loading />
    }

    const totalPages = orders.totalPages;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


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
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders && orders?.content.map((order) => (
                            <tr key={order.id}
                                onClick={() => handleViewDetail(order.id)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.customerName ?? 'N/A'}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                                {/* <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.deliveryDate).toLocaleDateString()}</td> */}
                                <td className="px-6 py-4 text-sm text-gray-500">{order.status}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">${order?.total?.toFixed(2)}</td>

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