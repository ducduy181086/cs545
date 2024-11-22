import { api } from './api';

export const fetchReviews = async (id) => {
  const response = await api.get(`/products/${id}/reviews?page=0&pagesize=100`);
  return response.data;
};

export const submitReview = async (id, content) => {
  const response = await api.post(`/products/${id}/reviews`, { content });
  return response.data;
};
