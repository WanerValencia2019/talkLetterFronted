import axiosInstance from '../../helpers/axiosInstance';

export const login = async ({email, password, history = null }) => {
	return await axiosInstance(history) .post('/auth/signinAdmin',{email, password})
}

