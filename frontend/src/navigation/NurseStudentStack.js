import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentsScreen from '../screens/nurse/StudentsScreen';
import StudentDetailScreen from '../screens/nurse/StudentDetailScreen';
import NewStudentScreen from '../screens/nurse/NewStudentScreen';

const Stack = createStackNavigator();

const NurseStudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StudentScreen" component={StudentsScreen} />
    <Stack.Screen name="Detail" component={StudentDetailScreen} />
    <Stack.Screen name="AddStudent" component={NewStudentScreen} />
  </Stack.Navigator>
);
    
export default NurseStudentStack;