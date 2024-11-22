import React from "react";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const handleProductClicked = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm hover:cursor-pointer" onClick={() => handleProductClicked(product.id)}>
      {/* Image */}
      <div className="relative flex items-center justify-center">
        {product.bestSeller && (
          <span className="absolute top-2 left-2 text-xs bg-yellow-300 text-gray-700 font-semibold px-2 py-1 rounded-full z-10">
            Bestseller
          </span>
        )}
        <img
          src={product.imageUrl ?? 'https://via.placeholder.com/180x160'}
          alt={product.name}
          className="mt-4 max-w-[180px] max-h-[160px] min-w-[120px] min-h-[100px] object-cover rounded-md"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium mt-4">{product.name}</h3>

      {/* Specifications */}
      <p className="text-sm text-gray-500">{product.description}</p>

      {/* Ratings */}
      <div className="flex items-center mt-2 justify-center ">
        <div className="flex text-yellow-400 text-sm">
          {"★".repeat(Math.floor(product?.averageRating ?? 0))}{"☆".repeat(5 - Math.floor(product?.averageRating ?? 5))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {product?.averageRating ?? 0}/5.0 ({product.reviewCount})
        </span>
      </div>

      {/* Pricing */}
      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800">${product.price}</p>
        {product.discount&&<p className="text-sm text-gray-500 line-through">${Math.floor((product.price + (product.discount*product.price)/100 ) * 100) / 100}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
