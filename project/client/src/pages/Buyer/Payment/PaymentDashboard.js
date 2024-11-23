import React, { useContext, useEffect, useState } from 'react';
import CartSummary from '../Cart/CartSummary';
import CreditCardForm from './CreditCardForm';
import ShippingSummary from '../ShippingAddress/ShippingSummary';
import CheckOutProgress from 'components/common/CheckOutProgreess';
import { useNavigate } from 'react-router-dom';
import Headers from 'components/layout/Header';
import { fetchCart } from 'services/cartService';
import { CartContext } from 'context/CartContext';
import { submitPayment } from 'services/paymentService';
import { ShippingContext } from 'context/ShippingContext';
import { buildShippingInfo } from 'utils/utils';
import Footer from 'components/layout/Footer';


const PaymentDashboard = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const { updateCounter } = useContext(CartContext);
    const { shippingInfo } = useContext(ShippingContext);

    useEffect(() => {
        fetchCart().then(res => {
            setCart(res);
            updateCounter(res?.items?.length ?? 0);
        }).finally(() => {
        });
    }, []);

    const handleSubmitPayment = (payment) => {
        const shippingData = buildShippingInfo(shippingInfo);
        const billingData = (shippingInfo.sameBillingAddress ?? false) ? shippingData : buildShippingInfo(shippingInfo.billingInfo);
        const paymentData = {
            customerName: shippingData.customerName,
            shippingAddress: shippingData.shippingAddress,
            shippingPhone: shippingData.phoneNumber,
            billingAddress: billingData.shippingAddress,
            billingPhone: billingData.phoneNumber,
            paymentType: 'credit/debit card',
            paymentDetails: payment.cardNumber,
            paymentStatus: 'paid'
        };

        submitPayment(paymentData).then(res => { console.log(res); navigate('/order-history') });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* {Header component} */}
            <Headers />

            {/* {Body component} */}
            <div className="flex-grow px-2 lg:px-20 p-4 mt-20">
                <CheckOutProgress step={4} totalSteps={4} title={'Shipping'} onBack={() => { navigate('/shipping/confirmation-address') }} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Payment method */}
                    <div className="md:col-span-2 p-4">
                        <h2 className="text-xl font-semibold">Payment detail</h2>
                        <CreditCardForm onSubmitPayment={handleSubmitPayment} />
                        <ShippingSummary />
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1 mt-4 ml-4 me-4">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <CartSummary data={cart?.items} />

                    </div>
                </div>
            </div>

            {/* {Footer component} */}
            <Footer className="mt-12" />
        </div>
    );
};

export default PaymentDashboard;
