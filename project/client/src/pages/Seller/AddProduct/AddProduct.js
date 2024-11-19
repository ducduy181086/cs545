import { useState } from "react";
import SellerHeader from "../SellerHeader"
import AddProductForm from "./AddProductForm"
import { useNavigate } from "react-router";

const AddProduct = (props) => {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        navigate('/seller/manage-products')
    };

    return <>
        <div className="min-h-full">
            <SellerHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900"> Add Product</h1>
                </div>
            </header>

            <main>

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <AddProductForm onAddProduct={handleAddProduct} />
                    {/* <button onClick={handleCreateProduct}
                        className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
                        Add Product
                    </button>
                    <ProductTable products={productsData} /> */}
                </div>
            </main>
        </div>
    </>
}
export default AddProduct