import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import api from '../api/axios';


const registerPushToken = async () => {
    if(!Device.isDevice) {
        console.log('Las push notifications solo funcionan en dispositivos físicos');
        return null;
    }

    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if(existingStatus !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if(finalStatus !== 'granted'){
        console.log('Permiso de notificaciones denegado');
        return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: '64735f54-e80e-4b9d-b2ba-8fed2282d22d',
    });
    console.log('Push token: ', tokenData.data);

    await api.put('/auth/push-token', {pushToken: tokenData.data});

    if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default', {
            name: 'defaul',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    return tokenData.data;
}

export default registerPushToken;