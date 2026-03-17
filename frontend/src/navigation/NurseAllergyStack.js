import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllergiesScreen from "../screens/nurse/AllergiesScreen";
import StudentDetailScreen from "../screens/nurse/StudentDetailScreen";
import NewAllergyScreen from "../screens/nurse/NewAllergyScreen";
import NewAttentionScreen from "../screens/nurse/NewAttentionScreen";

const Stack = createStackNavigator();

const NurseAllergiesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Alergias" component={AllergiesScreen} />
    <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
    <Stack.Screen name="NewAllergy" component={NewAllergyScreen}/>
    <Stack.Screen name="NewAttention" component={NewAttentionScreen}/>
  </Stack.Navigator>
);

export default NurseAllergiesStack;
