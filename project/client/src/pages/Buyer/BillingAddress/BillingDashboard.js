import React from 'react';
import CartSummary from '../Cart/CartSummary';
import BillingAddressForm from './BillingAddressForm';
import CheckOutProgress from 'components/common/CheckOutProgreess';
import { useNavigate } from 'react-router-dom';
import CheckoutHeader from '../../../components/layout/CheckoutHeader';

const BillingDashboard = () => {
    const navigate = useNavigate();

    return (
        <div >
            {/* {Header component} */}
            <CheckoutHeader />

            {/* {Body component} */}
            <div className="container mx-auto p-4 mt-20">
                <CheckOutProgress step={3} totalSteps={4} title={'Billing'} onBack={() => { navigate('/shipping/confirmation-address') }} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart items */}
                    <div className="md:col-span-2 p-4">
                        <h2 className="text-xl font-semibold">Billing Address</h2>
                        <BillingAddressForm />
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

export default BillingDashboard;
