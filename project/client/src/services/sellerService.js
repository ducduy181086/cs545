// import api from './api';
import productsData from "../mock_products.json";
import ordersData from "../mock_orders.json";

export const sellerFetchProducts = async () => {
  // const response = await api.get('/products');
  // return response.data;

  //mock
  return productsData;
};
export const sellerFetchProductById = async (productId) => {
  // const response = await api.get(`/products/${productId}`);
  // return response.data;

  //mock
  return productsData.find(p => p.id === Number.parseInt(productId));
};

export const sellerUpdateProduct = async (newProduct) => {
  // const response = await api.get(`/products/${productId}`);
  // return response.data;

  //mock
  // return productsData.find(p => p.id === Number.parseInt(productId));
};

export const sellerFetchOrders = async () => {
  // const response = await api.get('/orders');
  // return response.data;

  //mock
  return ordersData;
};

export const sellerFetchOrderById = async (orderId) => {
  // const response = await api.get(`/orders/${productId}`);
  // return response.data;

  //mock

  return ordersData?.find(o => o.orderId === Number.parseInt(orderId));
};

// export const createProduct = async (productData) => {
//   const response = await api.post('/products', productData);
//   return response.data;
// };

