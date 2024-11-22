import { useNavigate, useParams } from "react-router";
import SellerHeader from "../SellerHeader";
import ProductForm from "components/common/SellerProductForm";
import { useContext, useEffect, useState } from "react";
import { sellerDeleteProduct, sellerFetchProductById, sellerUpdateProduct } from "services/sellerService";
import RatingStar from "components/common/RatingStar";
import RatingComment from "components/common/RatingComment";
import AuthContext from "context/AuthContext";
import AdminHeader from "pages/Admin/AdminHeader";

const ProductDetail = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState();
    const [reviews, setReviews] = useState();
    const [viewMode, setViewMode] = useState('view')

    const { user } = useContext(AuthContext)

    const param = useParams();

    useEffect(() => {
        sellerFetchProductById(param.id, 5)
            .then(({ productDetail, productReviews }) => {
                setProduct(productDetail)
                setReviews(productReviews)
            }).catch(error => {
                console.error("Failed to fetch product details:", error);
            })
    }, [])

    const handleEdit = () => {
        setViewMode('update')
    }

    const handleCancelEdit = () => {
        setViewMode('view')
    }

    const handleDelete = async () => {
        await sellerDeleteProduct(product.id)
        navigate('/seller/manage-products')
    }

    const handleUpdateProduct = async (newProduct) => {
        await sellerUpdateProduct({
            ...product,
            ...newProduct
        })
        navigate('/seller/manage-products')
    }


    return <>
        <div className="min-h-full pb-40">
            {user.role === 'ADMIN' ?
                <AdminHeader /> : <SellerHeader />
            }
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex item-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Details of ID: {param.id}</h1>
                    <div>

                        {viewMode === 'view' && <button
                            className={`px-4 py-2 mx-1 text-sm font-medium ${user.role === 'ADMIN'
                                ? "bg-gray-300 text-gray-500"
                                : "bg-indigo-600 text-white hover:bg-indigo-500"
                                } rounded-lg`}
                            onClick={handleEdit}
                            disabled={user.role === 'ADMIN'}
                        >
                            Edit Product
                        </button>}
                        {viewMode === 'update' && user.role === 'SELLER' && <button
                            className={`px-4 py-2 mx-1 text-sm font-medium ${user.role === 'ADMIN'
                                ? "bg-gray-300 text-gray-500"
                                : "bg-orange-600 text-white hover:bg-orange-500"
                                } rounded-lg`}
                            onClick={handleCancelEdit}>
                            Cancel
                        </button>}

                        <button
                            className={`px-4 py-2 mx-1 text-sm font-medium ${user.role === 'ADMIN'
                                ? "bg-gray-300 text-gray-500"
                                : "bg-red-600 text-white hover:bg-red-500"
                                } rounded-lg`}
                            disabled={user.role === 'ADMIN'}
                            onClick={handleDelete}>
                            Delete Product
                        </button>
                    </div>
                </div>
            </header >
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {product && <>
                        <ProductForm
                            mode={viewMode}
                            initialData={product}
                            onSubmit={(newProduct) => handleUpdateProduct(newProduct)}
                        />

                    </>}
                </div>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-col justify-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Product Ratings</h2>
                    <RatingStar
                        ratings={product?.averageRating} reviewCount={product?.reviewCount} />
                </div>
                {reviews && reviews?.content && reviews.content.map((review) => (
                    <RatingComment key={review.id} review={review} />
                ))}
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-center">
                    <button type="button"
                        className="mt-30 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => { navigate('ratings') }}
                    >
                        View all Ratings
                    </button>
                </div>
            </main>
        </div >
    </>
}
export default ProductDetail;