/* eslint-disable consistent-return */

import axios from 'axios';

export default function axiosInstance(history = null, token = null) {
    const baseURL = process.env.REACT_APP_API_URL;

    const headers = {};

    try {
        if(token){
            headers.Authorization = token;  
        }else {
            const persistor = localStorage.getItem('user');    
            let user  = JSON.parse(persistor);
                
            const token = user?.token || 'invalid';
            headers.Authorization = token;   
        }        
               
    } catch (e) {
        console.log(e);
    }
    const axiosInstance = axios.create({
            baseURL,
            headers,
    });
    console.log(headers);
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
    axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';

    axiosInstance.interceptors.request.use((request) => request);

    axiosInstance.interceptors.response.use(
        (response) =>
            new Promise((resolve, reject) => {
                resolve(response);
            }),
        (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            if (error.response.status === 403 || error.response.status === 401) {
                //localStorage.setItem('user', null);
                //localStorage.setItem('isAuthenticated', false);
                if (history) {
                    //history.replace('/auth/login');
                } else {
                    //window.location = '/auth/login';
                }
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        },
    );

    return axiosInstance;
};
