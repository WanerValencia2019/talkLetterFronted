import { createContext } from 'react';
import { generateString } from '../../utils';

const defaultData = {
	isAuthenticatedAdmin: false,
	userAdmin: null,
	doLogin: () => null,
	doLogout: () => null
}

/*if(!localStorage.getItem('isAuthenticated') || !localStorage.getItem('user')){
	localStorage.setItem('isAuthenticated', defaultData.isAuthenticated);
	localStorage.setItem('user', defaultData.user);
}*/

export const adminAuthContext = createContext(defaultData);