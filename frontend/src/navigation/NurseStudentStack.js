import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentsScreen from '../screens/nurse/StudentsScreen';
import StudentDetailScreen from '../screens/nurse/StudentDetailScreen';
import NewStudentScreen from '../screens/nurse/NewStudentScreen';
import NewAllergyScreen from '../screens/nurse/NewAllergyScreen';
import NewAttentionScreen from '../screens/nurse/NewAttentionScreen';
import EditStudentScreen from '../screens/nurse/EditStudentScreen';

const Stack = createStackNavigator();

const NurseStudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StudentScreen" component={StudentsScreen} />
    <Stack.Screen name="Detail" component={StudentDetailScreen} />
    <Stack.Screen name="EditStudent" component={EditStudentScreen}/>
    <Stack.Screen name="AddStudent" component={NewStudentScreen} />
    <Stack.Screen name="NewAllergy" component={NewAllergyScreen} />
    <Stack.Screen name="NewAttention" component={NewAttentionScreen} />
  </Stack.Navigator>
);
    
export default NurseStudentStack;