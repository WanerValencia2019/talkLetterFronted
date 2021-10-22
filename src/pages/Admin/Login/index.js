import React, { useState, useContext, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Chip
} from "@mui/material";
import {
  EmailOutlined,
  VisibilityOff,
  Visibility,
  LockOutlined,
  Facebook,
  Google
} from "@mui/icons-material";
import { red } from '@mui/material/colors';

import { Link } from 'react-router-dom';

import ImageLogin from '../../../images/image_login.png';

import { Redirect } from 'react-router-dom';

export default function Login({ adminAuth }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const { email, password } = values;  
    await adminAuth.doLogin({ email, password });
  }

  useEffect(() => {
    return () => {
      setValues({
    email: "",
    password: "",
    showPassword: false,
  })
    }
  },[])


  if(adminAuth?.isAuthenticated && adminAuth?.user?.token){
    return <Redirect to="/admin/users" />
  }

  return (
    <div className="min-h-screen flex items-center bg-gray-900 justify-center py-12 px-4 sm:px-6 lg:px-8">    
      <div className="shadow-lg p-5 bg-white flex flex-row rounded">
        <div className="hidden md:block">
          <img width="250" height="250" src={ImageLogin} alt="portada" load="lazy"/>
        </div>
        <div className="flex flex-col md:border-l md:pl-4">
         <h2 className="text-center mb-5 text-lg">Administración de TalkLetter</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Correo electrónico</InputLabel>
              <Input
                required
                placeholder="example@mail.com"
                id="email"
                type="email"
                value={values.email}
                onChange={(e)=>setValues((prev)=>({...prev, email:e.target.value}))}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ marginTop: 3 }} variant="standard">
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                id="password"
                placeholder="password"
                required
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e)=>setValues((prev)=>({...prev, password:e.target.value}))}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setValues((prev) => ({
                          ...prev,
                          showPassword: !prev.showPassword,
                        }))
                      }
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>            
            <Button sx={{marginTop: 3}} color="success" variant="contained" type="submit" >Iniciar sesión</Button>            
          </form>
        </div>
      </div>
    </div>
  );
}
