import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import 'tailwindcss/base.css';
import 'tailwindcss/tailwind.css';
import 'tailwindcss/variants.css';
import 'tailwindcss/utilities.css';

import reportWebVitals from './reportWebVitals';

import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from './context/Auth/AuthProvider';
import AdminAuthProvider from './context/AuthAdmin/AdminAuthProvider';
import UsersProvider from './context/Users/UsersProvider';
import ToastProvider from './context/Toast/ToastProvider';
import CategoryProvider from './context/Category/CategoryProvider';
import PostProvider from './context/Post/PostProvider';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ToastProvider> 
    <AdminAuthProvider>
    <UsersProvider>
      <AuthProvider>
        <PostProvider>
          <CategoryProvider>
            <App /> 
          </CategoryProvider>
        </PostProvider>  
      </AuthProvider>
      </UsersProvider>      
    </AdminAuthProvider>
    </ToastProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
