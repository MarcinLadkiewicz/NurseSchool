import react from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectionHomeScreen from '../../screens/direction/DirectionHomeScreen';
import SettingsScreen from '../../screens/shared/SettingsScreen';
import { darkTheme as colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const DirectionTab = () => {
    return(
        <Tab.Navigator screenOption={{headerShown : false}}>    
            <Tab.Screen name = 'Inicio' component={DirectionHomeScreen} options={{
                tabBarIcon : (focused, size) => (
                    <Ionicons
                        name={focused ? 'home' : 'home-outline'}
                        size={size || 20}
                        color={colors.primary}
                    />
                )
            }}/>
            <Tab.Screen name = 'Ajustes' component={SettingsScreen} options={{
                tabBarIcon : (focused, size) => (
                    <Ionicons
                        name = {focused ? 'settings' : 'settings-outline'}
                        size = {size || 20}
                        color = {colors.primary}
                    />
                )
            }}/>
        </Tab.Navigator>
    )
}


export default DirectionTab;