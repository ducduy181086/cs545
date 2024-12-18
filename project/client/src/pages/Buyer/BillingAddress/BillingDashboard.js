import React, { useEffect, useState, useContext } from 'react';
import CartSummary from '../Cart/CartSummary';
import BillingAddressForm from './BillingAddressForm';
import CheckOutProgress from 'components/common/CheckOutProgreess';
import { useNavigate } from 'react-router-dom';
import Header from 'components/layout/Header';
import { fetchCart } from 'services/cartService';
import { CartContext } from 'context/CartContext';
import Footer from 'components/layout/Footer';

const BillingDashboard = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const { updateCounter } = useContext(CartContext);

    useEffect(() => {
        fetchCart().then(res => {
            setCart(res);
            updateCounter(res?.items?.length ?? 0);
        }).finally(() => {
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* {Header component} */}
            <Header />

            {/* {Body component} */}
            <div className="flex-grow px-2 lg:px-20 p-4 mt-20">
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
                        <CartSummary data={cart?.items} />
                    </div>
                </div>
            </div>

            {/* {Footer component} */}
            <Footer className="mt-12" />
        </div>
    );
};

export default BillingDashboard;
