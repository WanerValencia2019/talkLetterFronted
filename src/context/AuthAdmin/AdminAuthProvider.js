import React, { useState, useContext } from 'react'
import { adminAuthContext } from './adminAuthContext';
import { useHistory } from 'react-router-dom'
import { login } from './actions';
import { toastContext } from './../Toast/toastContext';

import useLocalStorage from '../../hooks/useLocalStorage';

export default function AuthProvider({ children }) {
	const history = useHistory();
	const [user, setUser] = useLocalStorage('userAdmin', null);
	const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticatedAdmin', false);
	const toast = useContext(toastContext);

	const doLogin = ({ email, password }) => {
		login({email, password})
		.then((res)=> {		
			const { message, user, token } = res.data;
			localStorage.setItem('userAdmin', JSON.stringify({ ...user,token}));
			localStorage.setItem('isAuthenticatedAdmin', JSON.stringify(true));
			setUser({ ...user,token});
			setIsAuthenticated(true);			
			toast.displayToast({message: 'Bienvenido '+user.username, type: 'success'});
		})
		.catch((err)=> {
			const { message } = err.response.data;
			toast.displayToast({message, type: 'error'});			
		})
	};

	const doLogout = () => {
		setIsAuthenticated(false);
		setUser(null);
		//history?.replace('/auth/login');
	}


	return (
		<adminAuthContext.Provider value={{user,isAuthenticated, doLogin, doLogout }} displayName="Auth Admin Context">
			{children}
		</adminAuthContext.Provider>
	)
}