import React, { useState, useEffect } from 'react';
import RatingView from './RatingView';
import ProductInfo from './ProductInfo';
import ReviewView from './ReviewsView';
import { useParams } from 'react-router-dom';
import { fetchProductById } from 'services/productService';
import Header from 'components/layout/Header';
import Loading from 'components/layout/Loading';
import { useNavigate } from 'react-router-dom';
import Footer from 'components/layout/Footer';


export default function ProductDashboard() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchProductById(id).then(res => {
            console.log(res);
            setProduct(res);
        }).
            catch(err => {
                setError(true);
                navigate('/404');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id])

    if (error || loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* {Header component} */}
            <Header />

            {/* {Body component} */}
            <div className="flex-grow px-2 lg:px-20 lg:px-20 p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart items */}
                    <div className="md:col-span-2 p-4 ">
                        <h2 className="text-xl font-semibold">Product informations</h2>
                        <div className='mt-8'>
                            {product && <ProductInfo product={product} />}
                        </div>
                    </div>

                    {/* Cart summary */}
                    <div className="md:col-span-1 mt-4 ml-4 me-4">
                        <h2 className="text-xl font-semibold">Rating & reviews</h2>
                        <RatingView product={product} />
                        <ReviewView />
                    </div>
                </div>

            </div>

            {/* {Footer component} */}
            <Footer className="mt-12" />
        </div>
    );
}
