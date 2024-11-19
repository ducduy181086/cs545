import { useNavigate, useParams } from "react-router";
import SellerHeader from "../SellerHeader";
import ProductForm from "components/common/SellerProductForm";
import { useEffect, useState } from "react";
import { sellerFetchProductById, sellerUpdateProduct } from "services/sellerService";

const ProductDetail = (props) => {

    const navigate = useNavigate();

    const [product, setProduct] = useState();
    const [viewMode, setViewMode] = useState('view')

    const param = useParams();

    useEffect(() => {
        sellerFetchProductById(param.id).then((res) => {
            setProduct(res)
            console.log('res = ', res)
        })
    }, [])

    const handleEdit = () => {
        setViewMode('update')
    }

    const handleCancelEdit = () => {
        setViewMode('view')
    }

    const handleUpdateProduct = (newProduct) => {
        sellerUpdateProduct(newProduct).then(res => {
            navigate('/seller/manage-products')
        })
    }

    return <>
        <div className="min-h-full">
            <SellerHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex item-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Details of ID: {param.id}</h1>
                    <div>

                        {viewMode === 'view' && <button className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            onClick={handleEdit}>
                            Edit Product
                        </button>}
                        {viewMode === 'update' && <button className="px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                            onClick={handleCancelEdit}>
                            Cancel
                        </button>}
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {product && <ProductForm
                        mode={viewMode}
                        initialData={product}
                        onSubmit={(newProduct) => handleUpdateProduct(newProduct)}
                    />}
                </div>
            </main>
        </div>
    </>
}
export default ProductDetail;