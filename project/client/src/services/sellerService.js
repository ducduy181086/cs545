import ordersData from "../mock_orders.json";
import { api } from "./api";

export const sellerFetchProducts = async (ownerId) => {

  const response = await api.get(`/products?sellerid=${ownerId}`);
  return response.data;
};
export const sellerFetchProductById = async (productId, pageSize = 3) => {
  try {
    const [productDetail, productReviews] = await Promise.all([
      api.get(`/products/${productId}`),
      api.get(`/products/${productId}/reviews?pagesize=${pageSize}`),
    ]);

    return {
      productDetail: productDetail.data,
      productReviews: productReviews.data,
    };
  } catch (error) {
    console.error("Error fetching product details or reviews:", error);
    throw error; // Rethrow error for higher-level handling
  }
};

export const sellerFetchCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

export const sellerAddProduct = async (newProduct) => {
  await api.post(`/products`,
    newProduct
  )
  return true
}

export const sellerUpdateProduct = async (newProduct) => {
  const response = await api.put(`/products/${newProduct.id}`, newProduct);
  return response.data;
};

export const sellerDeleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data;
}

export const sellerFetchOrders = async () => {
  const response = await api.get('/order/history');
  return response.data;
};

export const sellerFetchOrderById = async (orderId) => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
  // return ordersData?.find(o => o.orderId === Number.parseInt(orderId));
};

// export const createProduct = async (productData) => {
//   const response = await api.post('/products', productData);
//   return response.data;
// };

