import React, { useContext } from "react";

const RatingView = ({ product }) => {

  const ratingCounts = [599, 69, 82, 47, 10]; // Array to hold counts for 1 to 5 stars

  const totalRatings = ratingCounts.reduce((total, count) => total + count, 0);
  // Calculate percentage for each rating
  const percentage = ratingCounts.map(
    (count) => ((count / totalRatings) * 100).toFixed(1) // Round to 1 decimal place
  );

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8 ">

      <div className="flex flex-col justify-center items-center mx-auto mt-4">
        <p className="text-blue-500 text-6xl font-bold">{product?.ratings} </p>
        <p className="text-gray-500 text-sm">{product?.ratings} out of 5 ● {product?.totalRatings} ratings</p>
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
            <span className="ml-2 text-gray-500 text-md">{percentage[5 - star]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingView;