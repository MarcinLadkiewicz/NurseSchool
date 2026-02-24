import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>NurseSchool</Text>
            <Text style={styles.subtitle}>Login - En construcción</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0D2B4E',
    },
    subtitle: {
        fontSize: 16,
        color: '#5A7A9A',
        marginTop: 8
    }
});

export default LoginScreen;
