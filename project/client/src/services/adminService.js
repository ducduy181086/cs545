import { api } from "./api";

export const adminFetchUsers = async (page) => {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
};

export const adminFetchProducts = async (currentPage) => {
    const response = await api.get(`/products?page=${currentPage}`);
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

export const adminAddCategory = async (newCategory) => {
    const response = await api.post('/categories',
        newCategory
    )
    return response.data
}

export const adminDeleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
}


export const adminUpdateCategory = async (newCategory) => {
    const response = await api.put(`/categories/${newCategory.id}`,
        newCategory
    )
    return response.data
}

export const adminDeleteRating = async (id) => {
    const response = await api.delete(`/reviews/${id}`)
    return response.data
}

// export const sellerFetchProductById = async (productId) => {
//     const response = await api.get(`/products/${productId}`);
//     return response.data;

//     //mock
//     // return productsData.find(p => p.id === Number.parseInt(productId));
// };
