import React, { useState, useEffect, useContext } from 'react'
import { categoryContext } from './categoryContext';
import { useHistory } from 'react-router-dom';
import { addCategory, getCategories, updateCategory, deleteCategory } from './actions';
import { toastContext } from './../Toast/toastContext';
import { generateString } from '../../utils';

export default function CategoryProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const history = useHistory();
	const toast = useContext(toastContext);
	const [id_log, setIdLog] = useState(generateString())

	const getAllCategories = (token = null) => {		
		getCategories(history, token || null)
			.then((res)=>{
				setCategories(res.data);
			})
			.catch((err)=>console.log(err))
	}

	const doDeleteCategory = (idCategory, token = null)  => {
		deleteCategory({history, token: token || null, id: idCategory})
		.then((res)=>{
			toast.displayToast({message: 'Categoría eliminada', type: 'warning'});
			setIdLog(generateString())
		})
		.catch((err)=>console.log(err))
	}

	const doAddCategory = ({name, token = null})  => {
		addCategory({history, token: token || null, name})
		.then((res)=>{
			toast.displayToast({message: 'Categoría agregada correctamente', type: 'successs'});
			setIdLog(generateString())
		})
		.catch((err)=>console.log(err))
	}

	const doUpdateCategory = ({id, name, token = null})  => {
		updateCategory({history, token: token || null, name, id})
		.then((res)=>{
			toast.displayToast({message: 'Categoría actualizada correctamente', type: 'successs'});
			setIdLog(generateString())
		})
		.catch((err)=>console.log(err))
	}
	


	return (
		<categoryContext.Provider value={{categories, getAllCategories,doAddCategory, doDeleteCategory, id_log}}>
			{children}
		</categoryContext.Provider>
	)
}