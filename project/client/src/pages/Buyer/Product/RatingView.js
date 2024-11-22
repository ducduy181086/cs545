import React from "react";

const RatingView = ({ product }) => {

  const ratingCounts = [
    product.ratings["5"] ?? 0,
    product.ratings["4"] ?? 0,
    product.ratings["3"] ?? 0,
    product.ratings["2"] ?? 0,
    product.ratings["1"] ?? 0
  ]; // Array to hold counts for 1 to 5 stars

  const totalRatings = ratingCounts.reduce((total, count) => total + count, 0);
  // Calculate percentage for each rating
  const percentage = ratingCounts.map(
    (count) => ((count / totalRatings) * 100).toFixed(1) // Round to 1 decimal place
  );

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8 ">

      <div className="flex flex-col justify-center items-center mx-auto mt-4">
        <p className="text-blue-500 text-6xl font-bold">{product.averageRating.toFixed(1) ?? 0} </p>
        <p className="text-gray-500 text-sm">{product?.averageRating.toFixed(1) ?? 0} out of 5.0  ●  {product?.reviewCount ?? 0} ratings</p>
        <p className="text-gray-500 text-md font-bold"></p>
      </div>
      {/* Item List */}

      <div className="w-full space-y-3 my-4">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div key={star} className="flex items-center">
            {/* Star Icons */}
            <div className="w-24 text-gray-500 text-md">{star} stars</div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${percentage[5 - star]}%` }}
              />
            </div>
            <span className="w-8 ml-2 text-gray-500 text-md">{!isNaN( percentage[5 - star])? percentage[5 - star]:''}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingView;