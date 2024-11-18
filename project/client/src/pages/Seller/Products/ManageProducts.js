import { useState } from "react";
import SellerHeader from "../SellerHeader"
import ProductTable from "./ProductTable"
import productsData from "../../../mock_products.json";
import { Link } from "react-router-dom";

const ManageProduct = (props) => {
    const [products, setProducts] = useState(productsData)
    const [newProduct, setNewProduct] = useState({ id: "", name: "", price: "", stock: "" });

    // Create Product
    const handleCreateProduct = () => {
        //TODO 
        // if (newProduct.name && newProduct.price && newProduct.stock) {
        //     setProducts([...products, { ...newProduct, id: Date.now() }]);
        //     setNewProduct({ id: "", name: "", price: "", stock: "" });
        // }
    };

    // Update Product
    const handleUpdateProduct = (id, updatedProduct) => {
        // setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
    };

    // Delete Product
    const handleDeleteProduct = (id) => {
        // if (purchasedProductIds.includes(id)) {
        //     alert("This product cannot be deleted as it has been purchased.");
        //     return;
        // }
        // setProducts(products.filter((product) => product.id !== id));
    };


    return <>
        <div className="min-h-full">
            <SellerHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Link to={"add"}>
                        <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
                            Add Product
                        </button>
                    </Link>
                    <ProductTable products={productsData} />
                </div>
            </main>
        </div>
    </>
}

export default ManageProduct