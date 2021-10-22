import axiosInstance from '../../helpers/axiosInstance';


export const getUsers = async (history = null, token = null) => await axiosInstance(history, token).get('/users');

export const deleteUser = async ({history = null, token = null, id}) => await axiosInstance(history, token).delete(`/users/${id}`);

