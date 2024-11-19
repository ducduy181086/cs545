import React from "react";

const ProductCard = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
      {/* Badge */}
      <span className="text-xs bg-gray-100 text-gray-700 font-semibold px-2 py-1 rounded-full">
        Bestseller
      </span>

      {/* Image */}
      <div className="items-center justify-center flex">
      <img
        // src={props.image}
        src="https://www.backmarket.com/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://d2e6ccujb3mkqf.cloudfront.net/2ac2a826-ea5d-48fb-89c1-e0c7c12462b7-1_6dc26ba7-5609-4b49-9cb0-349d9b3160be.jpg"
        alt={props.name}
        className="mt-4 max-w-[140px] max-h-[140px] min-w-[100px] min-h-[100px] object-cover rounded-md"
      />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium mt-4">{props.name}</h3>

      {/* Specifications */}
      <p className="text-sm text-gray-500 mt-2">{props.name}</p>

      {/* Ratings */}
      <div className="flex items-center mt-3">
        <div className="flex text-yellow-400 text-sm">
          {"★".repeat(Math.floor(4))}{"☆".repeat(5 - Math.floor(4))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {4}/5 ({props.name})
        </span>
      </div>

      {/* Pricing */}
      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800">${props.name}</p>
        <p className="text-sm text-gray-500 line-through">${props.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
