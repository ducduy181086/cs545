// import api from './api';
import reviewData from "../mock_reviews.json";


export const fetchReviews = async () => {
  // const response = await api.get('/products');
  // return response.data;

  //mock
  return reviewData;
};
