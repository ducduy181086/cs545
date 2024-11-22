import React, { useState, useEffect } from "react";
import { fetchOrdersByStatus } from "services/orderService";
import OrderCard from "./OrderCard";
import { useNavigate } from 'react-router-dom';
import Pagination from "components/Pagination";
import EmptyHistory from "./EmptyHistory";

const OrderHistory = () => {
    const navigate = useNavigate();

    const tabs = [
        { id: 1, label: "All" },
        { id: 2, label: "Pending" },
        { id: 3, label: "Shipped" },
        { id: 4, label: "Delivered" },
        { id: 5, label: "Cancelled" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [order, setOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    const handleOnPgaeChange = (page) => {
        setCurrentPage(page - 1);
    }

    useEffect(() => {
        fetchOrdersByStatus(activeTab.label).then(res => {
            setOrder(res);
            setTotalPage(res.totalPages);
        });
    }, [activeTab, currentPage])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleOnItemClick = (orderId) => {
        navigate(`/order-history/${orderId}`);
    };

    // if (!orders || !orders.content || orders.content.length === 0) {
    //     return (
    //         <EmptyHistory/>
    //     );
    // }

    return (
        <div className="w-full mt-12">
            {/* Tab Navigation */}
            <div className="flex justify-start space-x-6 px-4 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab)}
                        className={`relative pb-2 font-medium text-gray-500 hover:text-black ${activeTab === tab.id ? "text-black" : ""
                            }`}
                    >
                        {tab.label}
                        {activeTab.id === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="w-full mt-12">
                {!order || !order.content || order.content.length === 0 && <EmptyHistory />}
                {order && order.content && order.content.map((order, index) => <div key={index} >{OrderCard(order, handleOnItemClick)}</div>)}
            </div>

            {/* Pagination */}
            <div className="mt-16">
                {order && order.content && order.content.length!=0 && <Pagination currentPage={(currentPage + 1)} totalPages={totalPage} onPageChange={handleOnPgaeChange} />}
            </div>
        </div>
    );
};

export default OrderHistory;