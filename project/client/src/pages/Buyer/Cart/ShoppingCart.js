import React from 'react';
import Header from '../../../components/layout/Header';
import CartDetail from './CartDetail';
import CartSummary from './CartSummary';

const ShoppingCart = () => {
    return (
        <div className='bg-gray-50'>
            {/* {Header component} */}
            <Header />

            {/* {Body component} */}
            <div className="container mx-auto p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart items */}
                    <div className="md:col-span-2 p-4">
                        <h2 className="text-xl font-semibold">Your cart</h2>
                        <CartDetail />
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <CartSummary/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
