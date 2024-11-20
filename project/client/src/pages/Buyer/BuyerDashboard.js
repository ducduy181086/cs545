// src/components/MacBookList.js
import ProductGrid from 'components/common/ProductGrid';
import FilterComponent from 'components/layout/FilterComponent';
import Header from 'components/layout/Header';
import React from 'react';

const macbookData = [
    {
        name: 'MacBook Air',
        image: '/path/to/macbook-air.png',
    },
    {
        name: 'MacBook Pro',
        image: '/path/to/macbook-pro.png',
    },
    {
        name: 'MacBook',
        image: '/path/to/macbook.png',
    },
    {
        name: 'All MacBooks',
        image: '/path/to/all-macbooks.png',
    },
    {
        name: 'MacBook Air',
        image: '/path/to/macbook-air.png',
    },
    {
        name: 'MacBook Pro',
        image: '/path/to/macbook-pro.png',
    },
    {
        name: 'MacBook',
        image: '/path/to/macbook.png',
    },
    {
        name: 'All MacBooks',
        image: '/path/to/all-macbooks.png',
    }
];

const BuyerDashboard = () => {
    return (
        <div>
            {/* {Header component} */}
            <Header />

            {/* {Body component} */}
            <div className="mt-28 text-center p-8 bg-gray-50">
                <div className="flex h-screen">
                    {/* First Column: Wrap Content */}
                    <div className="flex-none">
                        <div className="w-auto">
                            <FilterComponent />
                        </div>
                    </div>

                    {/* Second Column: Full Width */}
                    <div className="flex-grow ml-8">
                        <ProductGrid products={macbookData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
