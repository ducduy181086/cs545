// src/components/MacBookList.js
import ProductGrid from 'components/common/ProductGrid';
import FilterComponent from 'components/layout/FilterComponent';
import Header from 'components/layout/Header';
import React, { useState, useEffect } from 'react';
import { fetchProducts } from 'services/productService';
import { useLocation } from "react-router-dom";


const BuyerDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.data) {
            setProducts(location.state.data);
            setLoading(false);
        } else {
            setLoading(true);
            fetchProducts().then(res => {
                setProducts(res.content);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [location.state])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!products) {
        return <div>Loading...</div>;
    }


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
                        <ProductGrid products={products} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
