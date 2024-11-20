import React from 'react';


import CheckoutHeader from '../../../components/layout/CheckoutHeader';
import OrderHistory from './OrderHistory';

const OrderHistoryDashboard = () => {
    return (
        <div >
            {/* {Header component} */}
            <CheckoutHeader />

            {/* {Body component} */}
            <div className="container mx-auto p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* Cart items */}
                    <div className="md:col-span-4 ml-4 me-4 mt-4">
                        <h2 className="text-xl font-semibold">Order history</h2>
                        <OrderHistory />
                    </div>

                    {/* Cart summary */}
                    {/* <div className="md:col-span-1 mt-4 ml-4 mr-4">
                        <h2 className="text-xl font-semibold">Summary</h2>

                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryDashboard;
