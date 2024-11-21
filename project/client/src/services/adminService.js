import { api } from "./api";

export const adminFetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};


export const adminFetchSellersUnapproved = async () => {
    const response = await api.get('/admin/unapproved');
    return response.data;
};

export const adminPutSellersApprove = async (id) => {
    const response = await api.put(`/admin/approved/${id}`);
    return response.data;
};

// export const sellerFetchProductById = async (productId) => {
//     const response = await api.get(`/products/${productId}`);
//     return response.data;

//     //mock
//     // return productsData.find(p => p.id === Number.parseInt(productId));
// };
