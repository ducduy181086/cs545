import React, { useState, onSubmitReview } from 'react';

const ProductReview = ({onSubmitReview}) => {
  
  const [rating, setRating] = useState(0);  
  const [reviewText, setReviewText] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview({ rating, reviewText });
    setRating(0);
    setReviewText('');
  };

  const stars = Array(5).fill(false).map((_, index) => index < rating);

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Review</h2>

      <form onSubmit={handleSubmit}>
        {/* Rating Section */}
        <div className="mb-4">
          <span className="text-lg font-semibold">Rating:</span>
          <div className="flex items-center">
            {stars.map((filled, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill={filled ? "yellow" : "gray"}
                viewBox="0 0 24 24"
                className="cursor-pointer"
                onClick={() => handleRating(index + 1)}
              >
                <path d="M12 17.75l-5.317 3.138 2.024-6.313-5.232-3.954 6.572-.024L12 1l2.953 7.582 6.572.024-5.232 3.954 2.024 6.313L12 17.75z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Review Text Section */}
        <div className="mb-4">
          <label htmlFor="reviewText" className="block text-lg font-semibold mb-2">
            Review:
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            className="w-full p-4 border border-gray-300 rounded-md resize-none"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReview;
