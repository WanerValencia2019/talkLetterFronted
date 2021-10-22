import { createContext } from 'react';
import { generateString } from '../../utils';

const defaultData = {
	isAuthenticated: false,
	user: null,
	doLogin: () => null,
	doRegister: () => null,
	doLogout: () => null
}

/*if(!localStorage.getItem('isAuthenticated') || !localStorage.getItem('user')){
	localStorage.setItem('isAuthenticated', defaultData.isAuthenticated);
	localStorage.setItem('user', defaultData.user);
}*/

export const authContext = createContext(defaultData);