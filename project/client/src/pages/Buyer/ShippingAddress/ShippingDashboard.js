import React from 'react';
import ShippingAddressForm from './ShippingAddressForm';
import CartSummary from '../Cart/CartSummary';
import CheckOutProgress from 'components/common/CheckOutProgreess';
import { useNavigate } from 'react-router-dom';
import Header from 'components/layout/Header';

const ShippingDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* {Header component} */}
            <Header />

            {/* {Body component} */}
            <div className="container mx-auto p-4 mt-20">
                <CheckOutProgress step={2} totalSteps={4} title={'Shipping'} onBack={() => { navigate('/cart') }} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart items */}
                    <div className="md:col-span-2 p-4">
                        <h2 className="text-xl font-semibold">Shipping Address</h2>
                        <ShippingAddressForm />
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1 mt-4 ml-4 me-4">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingDashboard;
