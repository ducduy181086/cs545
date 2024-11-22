import ordersData from "../mock_orders.json";
import { api } from "./api";

export const fetchOrdersHistory = async () => {
  const response = await api.get('/order/history');
  return response.data;
};

export const fetchOrdersByStatus = async (status) => {
  const response = await api.get(`/order?status=${status.toUpperCase()}`);
  return response.data;

  //mock
  // if (status === "All") return ordersData;

  // return ordersData?.filter(o => o.status === status);
};

export const fetchOrderById = async (orderId) => {
  // const response = await api.get(`/orders-history/${orderId}`);
  // return response.data;

  console.log(orderId);
  return ordersData.find(order => order.orderId == orderId);
};

