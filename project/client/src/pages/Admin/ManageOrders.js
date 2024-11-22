import { sellerFetchOrders } from "services/sellerService"
import SellerHeader from "../SellerHeader"
import OrderTable from "./OrderTable"
import { useEffect, useState } from "react"

const AdminManageOrders = (props) => {
    const [orders, setOrders] = useState()

    useEffect(() => {
        console.log('fetch products')
        sellerFetchOrders().then(res => {
            setOrders(res);
        });
    }, [])




    return <>
        <div className="min-h-full">
            <SellerHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {orders && <OrderTable ordersData={orders} />}
                </div>
            </main>
        </div>
    </>
}

export default AdminManageOrders