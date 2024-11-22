import { api } from './api';

export const submitPayment = async (data) => {
  const response = await api.post('/payment/create', data);
  return response.data;
};
