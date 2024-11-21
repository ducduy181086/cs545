import React, { useState, useEffect } from "react";
import { fetchReviews as fetchReviews } from "services/reviewService";
import { useParams } from 'react-router-dom';
import ReviewItem from "./ReviewItem";

const ReviewView = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchReviews(id).then(res => {
      setReviews(res);
    });
  }, [id])

  if (!reviews || !reviews.content || reviews.content.length==0) return <><p>Empty</p></>;

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8 ">
      {/* Item List */}
      <ul>
        {reviews.content?.map((item) => (
          <ReviewItem key={item.id} comment={item} />
        ))}
      </ul>

    </div>
  );
};

export default ReviewView;