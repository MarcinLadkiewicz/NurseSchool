import React, {createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=> {
        const loadSession = async () => {
            const savedToken = await AsyncStorage.getItem('token'); 
            const savedUser = await AsyncStorage.getItem('user');
            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            };
            setLoading(false);
        };
        loadSession();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', {email, password});
        const {token: jwt, user: userData } = res.data;
        await AsyncStorage.setItem('token', jwt);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
