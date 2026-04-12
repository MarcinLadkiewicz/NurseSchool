import { File, Directory, Paths } from 'expo-file-system';
import { SERVER_URL } from '../api/server';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const downloadPdf = async (endpoint, filename) => {
    try{
        const token = await AsyncStorage.getItem('token');
        const destination = new Directory(Paths.cache, 'pdfs');
        destination.create({idempotent: true});
        const file = await File.downloadFileAsync(
            `${SERVER_URL}${endpoint}`,
            new File(destination, filename), {
                headers: {Authorization: `Bearer ${token}`},
                idempotent: true,
            }
        );

        await Sharing.shareAsync(file.uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Guardar informe PDF',
            UTI: 'com.adobe.pdf',
        });
    } catch (err){
        console.error('error descargando PDF:' , err);
        Alert.alert('Error', 'No se pudo descargar el pdf');
    }
};

export default downloadPdf;