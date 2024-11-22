import { useParams } from "react-router";
import SellerHeader from "../SellerHeader";
import { useContext, useEffect, useState } from "react";
import { sellerFetchProductById } from "services/sellerService";
import RatingStar from "components/common/RatingStar";
import RatingComment from "components/common/RatingComment";
import { adminDeleteRating } from "services/adminService";
import AdminHeader from "pages/Admin/AdminHeader";
import AuthContext from "context/AuthContext";

const ProductRatings = () => {

    const [product, setProduct] = useState();
    const [reviews, setReviews] = useState();
    const { user } = useContext(AuthContext)

    const param = useParams();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        sellerFetchProductById(param.id, 10)
            .then(({ productDetail, productReviews }) => {
                setProduct(productDetail)
                setReviews(productReviews)
                console.log("Product Detail:", productDetail);
                console.log("Product Reviews:", productReviews);

            }).catch(error => {
                console.error("Failed to fetch product details:", error);
            })
    }

    const handleDeleteRating = (id) => async () => {
        await adminDeleteRating(id)
        fetchData()
    }

    return <>
        <div className="min-h-full pb-40">
            {user.role === 'ADMIN' ?
                <AdminHeader /> : <SellerHeader />
            }
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex item-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Ratings of product ID: {param.id}</h1>
                    <RatingStar
                        ratings={product?.averageRating} reviewCount={product?.reviewCount} />
                </div>
            </header>
            <main>

                {reviews && reviews?.content && reviews.content.map((review) => (
                    <RatingComment key={review.id} review={review} onDelete={handleDeleteRating(review.id)} />
                ))}
            </main>
        </div>
    </>
}
export default ProductRatings;