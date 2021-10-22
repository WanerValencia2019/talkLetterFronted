import axiosInstance from '../../helpers/axiosInstance';

export const login = async ({email, password, history = null }) => {
	return await axiosInstance(history) .post('/auth/signinWithEmail',{email, password})
}

export const register = async ({email,username, firstName, lastName, password, history = null }) => {
	const data = {
		email,
		username, 
		firstName, 
		lastName, 
		password, 
	}
	return await axiosInstance(history) .post('/auth/register',data);
}