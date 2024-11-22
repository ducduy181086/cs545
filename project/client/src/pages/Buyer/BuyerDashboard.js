// src/components/MacBookList.js
import ProductGrid from 'components/common/ProductGrid';
import FilterComponent from 'components/layout/Filter/FilterComponent';
import Header from 'components/layout/Header';
import React, { useState } from 'react';

import Pagination from 'components/Pagination';
import Footer from 'components/layout/Footer';

const BuyerDashboard = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState(null);
    const [keyword, setKeyWord] = useState('');

    const handleOnPgaeChange = (page) => {
        setCurrentPage(page - 1);
    }

    const onUpdateTotalPage = (totalPage) => {
        setTotalPage(totalPage);
    }

    const handleFilter = (filter) => {
        console.log(filter);
        setFilter(filter);
    }

    const handleSearch = (keyword) => {
        console.log(keyword);
        setKeyWord(keyword);
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* {Header component} */}
            <Header showSearchBar ={true} onKeywordChanged={handleSearch} />

            {/* {Body component} */}
            <div className="flex-grow mt-28 text-center p-8 bg-gray-50">
                <div className="flex h-full">
                    {/* First Column: Wrap Content */}
                    <div className="flex-none">
                        <div className="w-auto">
                            <FilterComponent onFilterChanged={handleFilter} />
                        </div>
                    </div>

                    {/* Second Column: Full Width */}
                    <div className="flex-grow ml-8">
                        <ProductGrid filter ={filter} currentPage={currentPage} updateTotalPage={onUpdateTotalPage} />

                        {/* Pagination */}
                        <div className="mt-16">
                            <Pagination currentPage={(currentPage+1)} totalPages={totalPage} onPageChange={handleOnPgaeChange}/>    
                        </div>
                    </div>
                </div>
            </div>
            
            {/* {Footer component} */}
            <Footer className="mt-12" />
            
        </div>
    );
};

export default BuyerDashboard;
