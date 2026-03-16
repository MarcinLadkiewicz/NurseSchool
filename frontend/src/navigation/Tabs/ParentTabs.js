import react from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ParentsHomeScreen from '../../screens/parents/ParentsHomeScreen';
import ParentStudentScreen from '../../screens/parents/ParentStudentScreen';
import ParentAttentionScreen from '../../screens/parents/ParentAttentionScreen';
import ParentAllergieScreen from '../../screens/parents/ParentAllergieScreen';
import SettingsScreen from '../../screens/shared/SettingsScreen';
import {darkTheme as colors} from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const ParentTabs = () => {
    return (
        <Tab.Navigator screenOption={{headerShown : false}}>
            <Tab.Screen name='Inicio' component={ParentsHomeScreen} options={{
                tabBarIcon: (focused, size) => (
                    <Ionicons 
                        name = {focused ? 'home' : 'home-outline'}
                        size = {size || 20}
                        color = {colors.primary}
                    />
                )
            }}/>
            <Tab.Screen name='Hijos' component={ParentStudentScreen} options={{
                tabBarIcon: (focused, size) => (
                    <Ionicons
                        name={focused ? 'people' : 'people-outline'}
                        size={size || 20}
                        color={colors.primary}
                    />
                )
            }}/>
            <Tab.Screen name='Atenciones' component={ParentAttentionScreen} options={{
                tabBarIcon: (focused, size) => (
                    <Ionicons
                        name={focused ? 'pulse' : 'pulse-outline'}
                        size={size || 20}
                        color={colors.primary}
                    />
                )
            }}/>
            <Tab.Screen name='Alergias' component={ParentAllergieScreen} options={{
                tabBarIcon: (focused, size) => (
                    <Ionicons
                        name={focused ? 'warning' : 'warning-outline'}
                        size={size || 20}
                        color={colors.primary}
                    />
                )
            }}/>
            <Tab.Screen name='Ajustes' component={SettingsScreen} options={{
                tabBarIcon: (focused, size) => (
                    <Ionicons
                        name={focused ? 'settings' : 'settings-outline'}
                        size={size || 20}
                        color={colors.primary}
                    />
                )
            }}/>
        </Tab.Navigator>
    )
}

export default ParentTabs;