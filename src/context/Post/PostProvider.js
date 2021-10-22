import React, { useState, useEffect, useContext } from 'react'
import { postContext } from './postContext';
import { useHistory } from 'react-router-dom';
import { addPost, getPosts, updatePost, addLike, deleteLike, addComment } from './actions';
import { toastContext } from './../Toast/toastContext';
import { generateString } from '../../utils';

export default function CategoryProvider({ children }) {
	const [posts, setPosts] = useState([]);
	const [id_log, setIdLog] = useState(generateString())
	const history = useHistory();
	const toast = useContext(toastContext);

	const getAllPosts = () => {
			getPosts(history)
			.then((res)=>{
				setPosts(res.data);								
			})
			.catch((err)=>console.log(err))
    }  

	const doAddPost = ({title, content, categories}) => {
		addPost({ title, content, categories, history})
		.then((res)=> {
			const { message } = res.data;
			toast.displayToast({message, type: 'success'});
			setIdLog(generateString())
		})
		.catch((err)=>{
			toast.displayToast({message: 'No se pudo crear la publicación', type: 'error'});
		});
	}

	const doAddLike = ({ id }) => {
		addLike({history, id})
		.then((res)=> {
			const { message } = res.data;
			toast.displayToast({message, type: 'warning'});
			setIdLog(generateString())
		})
		.catch((err)=>{
			toast.displayToast({message: 'No se pudo añadir el me gusta', type: 'error'});
		});

	}

	const doDeleteLike = ({ id }) => {
		deleteLike({history, id})
		.then((res)=> {
			const { message } = res.data;
			toast.displayToast({message, type: 'warning'});
			setIdLog(generateString())
		})
		.catch((err)=>{
			toast.displayToast({message: 'No se pudo eliminar el me gusta', type: 'error'});
		});

	}

	const doAddComent = ({ id, message}) => {
		addComment({history, id, message})
		.then((res)=> {
			const  msg = res.data.message;
			toast.displayToast({message: msg, type: 'success'});
			setIdLog(generateString())
		})
		.catch((err)=>{
			toast.displayToast({message: 'No se pudo agregar el comentario', type: 'error'});
		});

	}

	return (
		<postContext.Provider value={{ getAllPosts, id_log, posts, doAddPost, doAddLike, doDeleteLike, doAddComent}}>
			{children}
		</postContext.Provider>
	)
}