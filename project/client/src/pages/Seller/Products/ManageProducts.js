import { useContext, useEffect, useState } from "react";
import SellerHeader from "../SellerHeader"
import { Link, useNavigate } from "react-router-dom";
import { sellerFetchProducts } from "services/sellerService";
import ProductTable from "components/common/SellerProductTable";
import AuthContext from "context/AuthContext";
import AdminHeader from "pages/Admin/AdminHeader";

const ManageProduct = (props) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log('fetch products')
        sellerFetchProducts(user.ownerId).then(res => {
            setProducts(res);
        }).catch(err => {
            navigate('/login')
        });
    }, [])

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
                    {products && <ProductTable products={products} />}
                </div>
            </main>
        </div>
    </>
}

export default ManageProduct