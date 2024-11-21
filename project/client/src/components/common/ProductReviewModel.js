import React, { useState } from 'react';

const ProductReviewModal = ({ product, onSubmitReview, onViewDetail }) => {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for rating and review text
    const [rating, setRating] = useState(0);  // Rating is from 0 to 5
    const [reviewText, setReviewText] = useState('');

    // Handle rating change (star selection)
    const handleRating = (value) => {
        setRating(value);
    };

    // Handle review text change
    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };

    // Handle form submission (log to console for now)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Review Submitted:', { rating, reviewText });
        onSubmitReview(product?.productId, rating, reviewText);  // Pass data to parent component
        // Reset form after submission
        setRating(0);
        setReviewText('');
        setIsModalOpen(false);  // Close modal after submission
    };

    const hanldeViewDetail = () => {
        onViewDetail(product?.productId);
    }

    // Handle opening and closing modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setRating(0);
        setReviewText('');
    };

    // Generate an array for star icons based on rating
    const stars = Array(5).fill(false).map((_, index) => index < rating);
    return (


        <div className="container mx-auto pt-4">
            {/* Button to open the modal */}
            <div className='flex'>
                <button
                    onClick={openModal}
                    className="text-blue-500 hover:text-blue-600"
                >
                    <div className='flex'>
                        <span className="material-symbols-outlined text-md">
                            kid_star
                        </span>
                        <p className='ml-2 text-md border-b'>Write a Review</p>
                    </div>
                </button>

                <button
                    onClick={hanldeViewDetail}
                    className="text-blue-500 hover:text-blue-600 ml-4"
                >
                    <div className='flex'>
                        <span className="material-symbols-outlined text-md">
                            wysiwyg
                        </span>
                        <p className='ml-2 text-md border-b'>View detail</p>
                    </div>
                </button>
            </div>

            {/* Modal (popup) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-4">Write a review</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Product info Section */}
                            <div className="flex items-center w-full justify-between ">
                                <div className="flex items-center">
                                    <img src="https://via.placeholder.com/80" alt="Product Image" className="w-16 h-16 object-cover rounded-lg" />
                                    <div className="ml-4">
                                        <p className="font-bold">{product.productName}</p>
                                        <p className="text-gray-500">${product.price}</p>
                                    </div>

                                </div>
                            </div>

                            {/* Rating Section */}
                            <div className="my-4">
                                <span className="text-lg font-semibold">Rating:</span>
                                <div className="flex items-center mt-2">
                                    {stars.map((filled, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill={filled ? "orange" : "gray"}
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
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                                >
                                    Submit Review
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductReviewModal;
