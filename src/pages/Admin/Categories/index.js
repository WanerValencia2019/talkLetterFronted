import React, { useEffect, useContext } from 'react'
import DashBoard from '../DashBoard';
import TableCategoriesAdmin from '../../../components/TableCategoriesAdmin';
import { categoryContext } from '../../../context/Category/categoryContext';
import { adminAuthContext } from '../../../context/AuthAdmin/adminAuthContext';

export default function Categories() {
	const { getAllCategories, categories, doDeleteCategory, id_log } = useContext(categoryContext);
	const { user } = useContext(adminAuthContext);
	useEffect(() => {
		const token = user?.token || null;
		getAllCategories(token);
	}, [id_log])

	return (
		<DashBoard>			
			<TableCategoriesAdmin data={categories} deleteCategory={doDeleteCategory} />
		</DashBoard>
	)
}