import OrderTable from "pages/Seller/Orders/OrderTable"
import SellerHeader from "pages/Seller/SellerHeader"

const AdminManageOrders = () => {
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
                    <OrderTable />
                </div>
            </main>
        </div>
    </>
}

export default AdminManageOrders