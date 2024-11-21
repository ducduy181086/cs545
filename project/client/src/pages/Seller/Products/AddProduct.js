import SellerHeader from "../SellerHeader"
import { useNavigate } from "react-router";
import ProductForm from "components/common/SellerProductForm";
import { sellerAddProduct } from "services/sellerService";
import { useState } from "react";

const AddProduct = (props) => {

    // const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddProduct = async (newProduct) => {
        console.log('new product = ', newProduct)
        try {
            const res = await sellerAddProduct(newProduct)
            if (res) {
                setErrorMessage('');//clear err
                navigate('/seller/manage-products')

            } else {
                setErrorMessage(
                    'Add product failed. Please try again.'
                );
            }
        } catch (err) {
            setErrorMessage(
                'Add product failed. Please try again.'
            );
        }
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
                    <ProductForm
                        mode="add"
                        onSubmit={(newProduct) => handleAddProduct(newProduct)}
                    />


                    {errorMessage && (
                        <div className="mt-4 rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <AddProductForm onAddProduct={handleAddProduct} /> */}
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