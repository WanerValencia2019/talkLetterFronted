import React, { useState, useContext, useEffect } from "react";
import {
  TextField,  
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Chip
} from "@mui/material";

import { red } from '@mui/material/colors';

import { Link } from 'react-router-dom';

import { authContext } from './../../context/Auth/authContext';
import { Redirect } from 'react-router-dom';

export default function Register({ auth }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
  });


  const handleSubmit =(e) => {
    e.preventDefault(); 
    const { email,username, firstName, lastName, password } = values;  
    auth.doRegister({ email,username, firstName, lastName, password});
  }

  useEffect(() => {
    return () => {
      setValues({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
  })
    }
  },[])

  if(auth?.isAuthenticated && auth?.user?.token){
    return <Redirect to="/" />
  }

  return (
    <div className="min-h-screen flex items-center bg-gray-900 justify-center py-12 px-4 sm:px-6 lg:px-8">    
      <div className="shadow-lg p-5 bg-white flex flex-row rounded">
        <div className="hidden md:block">
          <img width="400" height="400" src="https://cdn.pixabay.com/photo/2020/04/03/06/35/work-4997565_960_720.png" alt="portada" />
        </div>
        <div className="flex flex-col md:border-l md:pl-4">
         <h2 className="text-center mb-5 text-lg">Bienvenido a TalkLetter</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row mt-3">              
              <TextField
                variant="outlined"
                label="Nombre"
                required
                id="firstName"
                type="text"
                value={values.firstName}
                onChange={(e)=>setValues((prev)=>({...prev, firstName: e.target.value}))}
                sx={{marginRight: {md: 2}, marginBottom: {xs: 2} }}
              />
              <TextField
                variant="outlined"
                label="Apellidos"
                required
                id="lastName"
                type="text"
                value={values.lastName}
                onChange={(e)=>setValues((prev)=>({...prev, lastName: e.target.value}))}
              />
          </div>
          <div className="flex flex-col md:flex-row mt-3">
              <TextField
                label="Usuario"
                required
                id="username"
                type="text"
                sx={{marginRight: {md: 2}, marginBottom: {xs: 2} }}
                value={values.username}
                onChange={(e)=>setValues((prev)=>({...prev, username: e.target.value}))}
              />
              <TextField
                label="Correo electrónico"
                required
                id="email"
                type="email"
                value={values.email}
                onChange={(e)=>setValues((prev)=>({...prev, email: e.target.value}))}
              />
          </div>
          <div className="flex flex-col md:flex-row mt-3">
              <TextField
                label="Contraseña"
                id="password"
                required
                type={values.showPassword ? "text" : "password"}
                sx={{marginRight: {md: 2}, marginBottom: {xs: 2} }}
                value={values.password}
                onChange={(e)=>setValues((prev)=>({...prev, password: e.target.value}))}
              />
              <TextField
                id="passwordConfirm"
                label="Confirmar contraseña"
                required
                type={values.showPassword ? "text" : "password"}
                value={values.passwordConfirm}
                onChange={(e)=>setValues((prev)=>({...prev, passwordConfirm: e.target.value}))}
              /> 
          </div> 
            <FormControlLabel control={<Checkbox onChange={(e)=> setValues((prev) => ({...prev, showPassword: e.target.checked}))} />} label="Mostrar contraseña" />         
            <Button sx={{marginTop: 2}} color="success" variant="contained" type="submit" >Registrarme</Button>
          </form>
             <Divider sx={{marginTop: 2}}>
                <Chip label="O" />
            </Divider>
           <div className="mt-3 flex flex-row xs:flex-col justify-center">
           <Link to="/auth/login" className="text-blue-600">Iniciar sesión</Link>                               
           </div>
        </div>
      </div>
    </div>
  );
}
