import React, { createContext, useState, useEffect } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: null });
    const navigate = useNavigate();

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
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
    };

    const handleLogout = () => {
        setAuth({ user: null, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
