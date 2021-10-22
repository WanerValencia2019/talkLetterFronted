import axiosInstance from '../../helpers/axiosInstance';


export const getPosts = async (history = null) => await axiosInstance(history).get('/post');

export const addPost = async ({ history = null, title, content, categories }) => 
	await axiosInstance().post('/post',{title, content, categories});

export const updatePost = async ({ history = null, id, name }) => await axiosInstance(history).put(`/post/${id}`,{name});


export const addLike = async({history = null, id}) => await axiosInstance(history).post(`/post/likes/${id}`);
export const deleteLike = async({history = null, id}) => await axiosInstance(history).delete(`/post/likes/${id}`);

export const addComment = async({history = null, id, message}) => await axiosInstance(history).post(`/post/comments/${id}`, {message});