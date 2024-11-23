import React, { useState, useContext, useEffect } from 'react';
import CartDetail from './CartDetail';
import CartSummary from './CartSummary';
import Headers from '../../../components/layout/Header';
import { fetchCart, removeItemFromCart, updateItem } from 'services/cartService';
import { CartContext } from 'context/CartContext';
import Footer from 'components/layout/Footer';
import EmptyCart from './EmptyCart';


const CartDashboard = () => {
    const [cart, setCart] = useState(null);
    const [refresh, setRefresh] = useState(new Date().getMilliseconds());
    const { updateCounter } = useContext(CartContext);

    useEffect(() => {
        fetchCart().then(res => {
            setCart(res);
            updateCounter(res?.items?.length ?? 0);
        }).finally(() => {
        });
    }, [refresh]);

    const hanldeRemove = (id) => {
        removeItemFromCart(id).then(res => {
            setRefresh(new Date().getMilliseconds());
        });
    };

    const handleUpdate = (id, qty) => {
        updateItem(id, qty).then(res => {
            setRefresh(new Date().getMilliseconds());
        });
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* {Header component} */}
            <Headers />

            {/* {Body component} */}
            <div className="flex-grow px-2 lg:px-20 p-4 mt-20">
                {(!cart || !cart.items || cart.items.length === 0) && <EmptyCart />}
                {(cart && cart.items && cart.items.length > 0) && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart items */}
                    <div className="md:col-span-2 ml-4 me-4 mt-4">
                        <h2 className="text-xl font-semibold">Your cart</h2>
                        <CartDetail data={cart?.items} onRemove={hanldeRemove} onUpdate={handleUpdate} />
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1 mt-4 ml-4 mr-4">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <CartSummary data={cart?.items} />
                    </div>
                </div>}
            </div>

            {/* {Footer component} */}
            <Footer className="mt-12" />
        </div>
    );
};

export default CartDashboard;
