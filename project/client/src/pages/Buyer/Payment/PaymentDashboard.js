import React from 'react';
import CartSummary from '../Cart/CartSummary';
import CreditCardForm from './CreditCardForm';
import ShippingSummary from '../ShippingAddress/ShippingSummary';
import CheckOutProgress from 'components/common/CheckOutProgreess';
import { useNavigate } from 'react-router-dom';
import Headers from  'components/layout/Header';

const PaymentDashboard = () => {
    const navigate = useNavigate();

    return (
        <div >
            {/* {Header component} */}
            <Headers />

            {/* {Body component} */}
            <div className="container mx-auto p-4 mt-20">
                <CheckOutProgress step={4} totalSteps={4} title={'Shipping'} onBack={() => { navigate('/shipping/confirmation-address') }} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Payment method */}
                    <div className="md:col-span-2 p-4">
                        <h2 className="text-xl font-semibold">Payment detail</h2>
                        <CreditCardForm />
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1 mt-4 ml-4 me-4">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <CartSummary />
                        <ShippingSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDashboard;
