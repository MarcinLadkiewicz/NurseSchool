import react from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ParentsHomeScreen from '../../screens/parents/ParentsHomeScreen';
import ParentChildStack from '../ParentChildStack';
import ParentAttentionScreen from '../../screens/parents/ParentAttentionScreen';
import ParentAllergieScreen from '../../screens/parents/ParentAllergieScreen';
import SettingsScreen from '../../screens/shared/SettingsScreen';
import {darkTheme as colors} from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const ParentTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 85,
            paddingBottom: 20,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={ParentsHomeScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size || 20}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Hijos"
          component={ParentChildStack}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={size || 20}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Atenciones"
          component={ParentAttentionScreen}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Ionicons
                name={focused ? "pulse" : "pulse-outline"}
                size={size || 20}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Alergias"
          component={ParentAllergieScreen}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Ionicons
                name={focused ? "warning" : "warning-outline"}
                size={size || 20}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Ajustes"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size || 20}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
}

export default ParentTabs;