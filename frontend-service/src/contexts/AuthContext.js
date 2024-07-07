import React, { createContext, useState, useEffect } from 'react';
import { login } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth((prevAuth) => ({ ...prevAuth, token }));
        }
    }, []);

    const handleLogin = async (data) => {
        const response = await login(data);
        if (response.data.token) {
            setAuth({ user: response.data.user, token: response.data.token });
            localStorage.setItem('token', response.data.token);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
