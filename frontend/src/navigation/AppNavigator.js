import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import NurseHomeScreen from '../screens/nurse/NurseHomeScreen';
import ParentsHomeScreen from '../screens/parents/ParentsHomeScreen';
import DirectionHomeScreen from '../screens/direction/DirectionHomeScreen';
import NurseTabs from './Tabs/NurseTabs';



const Stack = createStackNavigator();

const AppNavigator = () => {

    const {token, user} = useContext(AuthContext);
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!token ? (
            <>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen}/>
            </>
          ) : user?.rol === 'enfermero' ? (
            <Stack.Screen name='NurseHome' component={NurseTabs}/>
          ) : user?.rol === 'padre' ? (
            <Stack.Screen name='ParentHome' component={ParentsHomeScreen}/>
          ) : user?.rol === 'direccion' ? (
            <Stack.Screen name='DirectionHome' component={DirectionHomeScreen}/>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default AppNavigator;