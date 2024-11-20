import { useParams } from "react-router";
import SellerHeader from "../SellerHeader";
import { useEffect, useState } from "react";
import { sellerFetchProductById, sellerUpdateProduct } from "services/sellerService";
import RatingStar from "components/common/RatingStar";
import RatingComment from "components/common/RatingComment";

const ProductRatings = () => {

    const [product, setProduct] = useState();

    const param = useParams();

    useEffect(() => {
        sellerFetchProductById(param.id).then((res) => {
            setProduct(res)
            console.log('res = ', res)
        })
    }, [])


    return <>
        <div className="min-h-full pb-40">
            <SellerHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex item-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Ratings of product ID: {param.id}</h1>
                    <RatingStar
                        ratings={product?.ratings} reviewCount={5} />
                </div>
            </header>
            <main>
                <RatingComment />
                <RatingComment />
                <RatingComment />
                <RatingComment />
                <RatingComment />


            </main>
        </div>
    </>
}
export default ProductRatings;