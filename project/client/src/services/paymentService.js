import { api } from './api';

export const submitPayment = async (data) => {
  const response = await api.post('/order/place', data);
  return response.data;
};
