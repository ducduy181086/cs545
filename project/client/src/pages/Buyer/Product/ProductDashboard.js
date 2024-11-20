import React, {useState, useEffect} from 'react';
import ProductDetailHeader from 'components/layout/ProductDetailHeader';
import RatingView from './RatingView';
import ProductInfo from './ProductInfo';
import ReviewView from './ReviewsView';
import { useParams } from 'react-router-dom';
import { fetchProductById } from 'services/productService';

export default function ProductDashboard() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchProductById(id).then(res => {
            console.log(res);
            setProduct(res);
        });
    }, [id])

    return (
        <div >
            {/* {Header component} */}
            <ProductDetailHeader />

            {/* {Body component} */}
            <div className="container mx-auto p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart items */}
                    <div className="md:col-span-2 p-4">
                        <h2 className="text-xl font-semibold">Product informations</h2>
                        <ProductInfo />
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1 mt-4 ml-4 me-4">
                        <h2 className="text-xl font-semibold">Rating & reviews</h2>
                        <RatingView product={product} />
                        <ReviewView />
                    </div>
                </div>

            </div>
        </div>
    );
}
