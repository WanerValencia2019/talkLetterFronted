import axiosInstance from '../../helpers/axiosInstance';


export const getCategories = async (history = null, token = null) => await axiosInstance(history, token).get('/category');

export const addCategory = async ({ history = null, token=null, name }) => await axiosInstance(history, token).post('/category',{name});

export const updateCategory = async ({ history = null,token=null, id, name }) => await axiosInstance(history, token).put(`/category/${id}`,{name});

export const deleteCategory = async ({ history = null,token=null, id}) => await axiosInstance(history, token).delete(`/category/${id}`);


