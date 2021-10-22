import React, { useContext, useEffect } from 'react'
import DashBoard from '../DashBoard';
import TableUserAdmin from '../../../components/TableUserAdmin';
import { usersContext } from '../../../context/Users/usersContext';

export default function Users() {
	const { users, getAllUsers, doDeleteUser, id_log } = useContext(usersContext);
	
	useEffect(() => {
		getAllUsers();	
	}, [id_log])	

	return (
		<DashBoard>			
			<TableUserAdmin data={users} deleteUser={doDeleteUser}/>
		</DashBoard>
	)
}