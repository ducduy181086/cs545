// import api from './api';
import productData from "../mock_product.json";


export const fetchProducts = async () => {
  // const response = await api.get('/products');
  // return response.data;
};

export const fetchProductById = async (id) => {

  return productData;
  // const response = await api.get(`/products/${id}`);
  // return response.data;
};

export const createProduct = async (productData) => {
  // const response = await api.post('/products', productData);
  // return response.data;
};
