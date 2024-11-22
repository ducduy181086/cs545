import ProductCard from "./ProductCard";
import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { fetchProducts } from 'services/productService';

function ProductGrid({filter, currentPage, updateTotalPage }) {

    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.data) {
            setProducts(location.state.data);
        } else {
            fetchProducts(currentPage).then(res => {
                setProducts(res.content);
                updateTotalPage(res.totalPages);
            });
        }
    }, [location.state, currentPage])

    return (
        <div>
            <p className="text-left text-xl font-semibold">Bestseller of the week</p>
            <h3 className="text-left font-medium mb-8 text-gray-800">Don't miss our bestseller products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {products.map((item, index) =><div key={index}><ProductCard product ={item}/></div>)}
            </div>
        </div>
    );
}

export default ProductGrid;