import React, { useContext, useState, useEffect } from 'react'
import {TextareaAutosize, Button, FormControl, MenuItem, InputLabel, TextField } from '@mui/material';
import { categoryContext } from '../../context/Category/categoryContext';
import { postContext } from '../../context/Post/postContext';

import Select from 'react-select';

export default function CreatePostHeader() {
	const { categories, getAllCategories } = useContext(categoryContext);
	const { doAddPost } = useContext(postContext);	
	const [categoriesSelected, setCategoriesSelected] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	
	const handleSubmit = (event) =>{
		event.preventDefault();		
		doAddPost({ title, categories: categoriesSelected, content });
		setCategoriesSelected([]);
		setTitle('');
		setContent('');
	}

	useEffect(() => {
		getAllCategories();
	}, [])

	return (
		<div className="p-4 shadow rounded bg-white">
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col">
				<TextField required placeholder="Titulo" value={title} onChange={(e)=>setTitle(e.target.value)} sx={{marginBottom: 1, borderWidth: 0}} />
				<TextareaAutosize required minRows={3} value={content} onChange={(e)=>setContent(e.target.value)}  placeholder="Hola, que podemos aprender de ti?" />		
				<div className="min-w-min max-w-xs">
					<Select 
					 options={categories.map((v) =>({label: v.name, value: v._id}))}
					 onChange={(values)=>setCategoriesSelected(values.map((v)=>v.label))}
					 isMulti
					 placeholder="Seleciona las categorias"
					 className="mt-1"
					 required
					/>
				</div>
				<Button type="submit" sx={{marginTop: 1}} variant="contained">Publicar</Button>
			</div>
		</form>	
		</div>
	)
}