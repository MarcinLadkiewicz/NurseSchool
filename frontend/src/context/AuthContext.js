import React, {createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerPushToken from '../utils/registerPushToken';
import * as Notifications from'expo-notifications';
import api from '../api/axios';

Notifications.setNotificationHandler({
    handleNotification: async() => ({
        shouldShowAlert: true, 
        shouldPlaySound: true, 
        shouldSetBadge: false,
    }),
});

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const notificationListener = useRef();
    const responseListener = useRef();


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

        const notificationSub = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificación recibida:', notification);
    });

    const responseSub = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Usuario tocó la notificación:', response);
    });

    return () => {
        notificationSub.remove();
        responseSub.remove();
    };
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', {email, password});
        const {token: jwt, user: userData } = res.data;
        await AsyncStorage.setItem('token', jwt);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);

        registerPushToken().catch(err => console.log('Error registrando push token: ', err));
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
