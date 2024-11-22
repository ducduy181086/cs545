import { api } from './api';
import { REACT_APP_API_PRODUCT_PER_PAGE } from 'config';

export const fetchProducts = async (requestData) => {
  const params = {
    name: requestData.keyword,
    page: requestData.page,
    pagesize: REACT_APP_API_PRODUCT_PER_PAGE,
    minprice: requestData.filter?.priceRange?.minPrice,
    maxprice: requestData.filter?.priceRange?.maxPrice,
    categoryids: requestData.filter?.categoryids,
    brand: requestData.filter?.brand,
    color: requestData.filter?.color,
    size: requestData.filter?.size,
    material: requestData.filter?.material,
    isnewarrival: requestData.filter?.isnewarrival,
  };

  const queryString = Object.keys(params)
  .filter(key => {
    const value = params[key];
    // Exclude null, undefined, or empty arrays
    return value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0);
  })
  .map(key => {
    const value = params[key];
    // Handle arrays by joining them with commas
    if (Array.isArray(value)) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
    } else {
      // Encode single values
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
  })
  .join('&'); // Join all parts with '&'

  const response = await api.get(`/products?${queryString}`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchFilterConfig = async () => {
  const response = await api.get('/products/filter-config');
  return response.data;
}