import { api } from "./api";

export const fetchOrdersHistory = async () => {
  const response = await api.get('/order/history');
  return response.data;
};

export const fetchOrdersByStatus = async (status) => {
  const response = await api.get(`/order?status=${status.toUpperCase().replace('ALL', '')}`);
  return response.data;
};

export const fetchOrderById = async (orderId) => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
};

export const requestCancelPendingOrder = async (orderId) => {
  const response = await api.put(`/order/cancel/${orderId}`)
  return response.data;
}
