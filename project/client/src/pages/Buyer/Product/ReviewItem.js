import React from 'react';

const ReviewItem = ({ comment }) => {
  const { userName, avatar, rating, formattedDate, content } = comment;

  // Render filled and empty stars for the rating
  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating); // Filled stars for the rating
    const emptyStars = '☆'.repeat(5 - rating); // Empty stars to make 5 stars
    return filledStars + emptyStars;
  };

  return (
    <div className="flex flex-col p-4 border-b bg-white">
      <div className="flex items-center space-x-4 mb-4">
        {/* Avatar */}
        <img
          src={avatar}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          {/* User Name */}
          <p className="font-semibold text-lg">{userName}</p>
          {/* Date */}
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-2">
        <span className="text-yellow-500 text-lg">{renderStars(rating)}</span>
      </div>

      {/* Comment Content */}
      <p className="text-gray-700 text-md">{content}</p>
    </div>
  );
};

export default ReviewItem;
