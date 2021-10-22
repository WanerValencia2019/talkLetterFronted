import React, { useState, useContext } from 'react'
import { authContext } from './authContext';
import { useHistory } from 'react-router-dom'
import { login, register } from './actions';
import { toastContext } from './../Toast/toastContext';

import useLocalStorage from '../../hooks/useLocalStorage';

export default function AuthProvider({ children }) {
	const history = useHistory();
	const [user, setUser] = useLocalStorage('user', null);
	const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
	const toast = useContext(toastContext);

	const doLogin = ({ email, password }) => {
		login({email, password})
		.then((res)=> {		
			const { message, user, token } = res.data;
			localStorage.setItem('user', JSON.stringify({ ...user,token}));
			localStorage.setItem('isAuthenticated', JSON.stringify(true));
			setUser({ ...user,token});
			setIsAuthenticated(true);			
			toast.displayToast({message: 'Bienvenido '+user.username, type: 'success'});
		})
		.catch((err)=> {
			const { message } = err.response.data;
			toast.displayToast({message, type: 'error'});			
		})
	};
	const doRegister = ({ email,username, firstName, lastName, password }) => {
		register({email,username, firstName, lastName, password})
		.then((res)=>{
			const { message } = res.data;
			toast.displayToast({message, type: 'success'});
		})
		.catch((err)=>{
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
		<authContext.Provider value={{user,isAuthenticated, doLogin, doRegister, doLogout }} displayName="Auth Context">
			{children}
		</authContext.Provider>
	)
}