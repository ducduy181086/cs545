import { useContext } from "react";
import SellerHeader from "../SellerHeader"
import { Link } from "react-router-dom";
import ProductTable from "components/common/SellerProductTable";
import AuthContext from "context/AuthContext";
import AdminHeader from "pages/Admin/AdminHeader";

const ManageProduct = () => {
    const { user } = useContext(AuthContext)
    return <>
        <div className="min-h-full">
            {user.role === 'ADMIN' ?
                <AdminHeader /> : <SellerHeader />
            }
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {user.role === 'SELLER' &&
                        <Link to={"add"}>
                            <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
                                Add Product
                            </button>
                        </Link>}
                    <ProductTable />
                </div>
            </main>
        </div>
    </>
}

export default ManageProduct