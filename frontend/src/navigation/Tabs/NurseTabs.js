import react from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import NurseHomeScreen from '../../screens/nurse/NurseHomeScreen';
import StudentsScreen from '../../screens/nurse/StudentsScreen'; 
import NewAttentionScreen from '../../screens/nurse/NewAttentionScreen';
import AllergiesScreen from '../../screens/nurse/AllergiesScreen';
import SettingsScreen from '../../screens/shared/SettingsScreen';
import {darkTheme as colors} from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const NurseTabs = () => {
return (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Inicio"
      component={NurseHomeScreen}
      options={{
        tabBarIcon: ({focused, size}) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={size || 20}
            color={colors.primary}
          />
        )
      }}
    />
    <Tab.Screen
      name="Alumnos"
      component={StudentsScreen}
      options={{
        tabBarIcon: ({focused, size}) => (
          <Ionicons
            name={focused ? 'people' : 'people-outline'}
            size={size || 20}
            color={colors.primary}
          />
        )
      }}
    />
    <Tab.Screen name="Atenciones" component={NewAttentionScreen} options={{
        tabBarIcon : ({focused, size}) => (
            <Ionicons
                name={focused ? 'pulse' : 'pulse-outline'}
                size={size || 20}
                color={colors.primary}
        />)
    }} />
    <Tab.Screen name="Alergias" component={AllergiesScreen} options={{
        tabBarIcon : ({focused, size}) => (
            <Ionicons
                name={focused ? 'warning' : 'warning-outline'}
                size={size || 20}
                color={colors.primary}
            />
        )
    }} />
    <Tab.Screen name="Ajustes" component={SettingsScreen} options={{
        tabBarIcon : ({focused, size}) => (
            <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={size || 20}
                color={colors.primary}
            />
        )
    }} />
  </Tab.Navigator>
);
}

export default NurseTabs;