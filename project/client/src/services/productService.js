import { api } from './api';
import { REACT_APP_API_PRODUCT_PER_PAGE } from 'config';

export const fetchProducts = async (page) => {
  const response = await api.get(`/products?page=${page}&pagesize=${REACT_APP_API_PRODUCT_PER_PAGE}`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  // const response = await api.post('/products', productData);
  // return response.data;
};

export const fetchFilterConfig = async () => {
  const response = await api.get('/products/filter-config');
  return response.data;
}