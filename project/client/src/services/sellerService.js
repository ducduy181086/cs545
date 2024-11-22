import { api } from "./api";

export const sellerFetchProducts = async (ownerId, currentPage) => {
  const response = await api.get(`/products?sellerid=${ownerId}&page=${currentPage}`);
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

export const sellerFetchCategoriesItems = async () => {
  const response = await api.get('/categories/items')
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

export const sellerFetchOrders = async (page) => {
  const response = await api.get(`/order/history?page=${page??0}`);
  return response.data;
};

export const sellerFetchOrderById = async (orderId) => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
  // return ordersData?.find(o => o.orderId === Number.parseInt(orderId));
};

export const sellerUpdateOrderStatus = async (orderId, newStatus) => {
  const response = await api.put(`/order/change/${orderId}?status=${newStatus}`);
  return response.data;
  // return ordersData?.find(o => o.orderId === Number.parseInt(orderId));
};

export const sellerCancelOrder = async (orderId) => {
  const response = await api.put(`/order/cancel/${orderId}`);
  return response.data;
  // return ordersData?.find(o => o.orderId === Number.parseInt(orderId));
};

// export const createProduct = async (productData) => {
//   const response = await api.post('/products', productData);
//   return response.data;
// };

