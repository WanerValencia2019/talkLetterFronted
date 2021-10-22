import React, { useState, useEffect, useContext } from 'react'
import { usersContext } from './usersContext';
import { adminAuthContext } from '../AuthAdmin/adminAuthContext';
import { useHistory } from 'react-router-dom';
import { getUsers, deleteUser } from './actions';
import { toastContext } from './../Toast/toastContext';
import { generateString } from '../../utils';

export default function CategoryProvider({ children }) {
	const [users, setUsers] = useState([]);
	const adminAuth = useContext(adminAuthContext);
	const toast = useContext(toastContext);
	const history = useHistory();
	const [id_log, setIdLog] = useState(generateString())

		const getAllUsers = () => {
			const token = adminAuth?.user?.token || null;
			getUsers(history, token)
			.then((res)=>{
				setUsers(res.data);
			})
			.catch((err)=>console.log(err))
		}

	const doDeleteUser = (idUser, token = null)  => {
		deleteUser({history, token: token || null, id: idUser})
		.then((res)=>{
			toast.displayToast({message: 'Usuario eliminado', type: 'warning'});
			setIdLog(generateString())
		})
		.catch((err)=>console.log(err))
	}
  

	return (
		<usersContext.Provider value={{ users, getAllUsers, doDeleteUser, id_log }}>
			{children}
		</usersContext.Provider>
	)
}