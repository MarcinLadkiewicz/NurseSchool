import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

    const {token, user} = useContext(AuthContext);
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {!token ? 
                (<Stack.Screen name='Login' component={LoginScreen}/>) 
                : 
                (
                    //Aqui irán las rutas según user.rol
                <Stack.Screen name='Login' component={LoginScreen}/>
                )} 
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;