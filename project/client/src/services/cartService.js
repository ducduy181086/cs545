import { api } from './api';

export const fetchCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addItemToCart = async (id, qty, size, color) => {
  const response = await api.post(`/cart/add-item?productId=${id}&quantity=${qty}&size=${size}&color=${color}`);
  return response.data;
};

export const removeItemFromCart = async (id) => {
  const response = await api.delete(`/cart/remove-item/${id}`);
  return response.data;
};

export const updateItem = async (id, qty) => {
  const response = await api.put(`/cart/update-item/${id}?quantity=${qty}`);
  return response.data;
};

export const clearCart = async (id) => {
  const response = await api.delete(`/cart/clear/${id}`);
  return response.data;
};
