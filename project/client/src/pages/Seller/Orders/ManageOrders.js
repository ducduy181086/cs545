import SellerHeader from "../SellerHeader"
import OrderTable from "./OrderTable"
import orders from "../../../mock_orders.json";

const ManageOrders = (props) => {

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
                    <OrderTable ordersData={orders} />
                </div>
            </main>
        </div>
    </>
}

export default ManageOrders