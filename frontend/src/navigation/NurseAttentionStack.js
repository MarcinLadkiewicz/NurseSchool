import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewAttentionScreen from '../screens/nurse/NewAttentionScreen';
import AttentionScreen from '../screens/nurse/AttentionScreen';
import AttentionDetailScreen from '../screens/nurse/AttentionDetailScreen';

const Stack = createStackNavigator();

const NurseAttentionStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Atenciones' component={AttentionScreen}/>
        <Stack.Screen name='AttentionDetail' component={AttentionDetailScreen}/>
        <Stack.Screen name='NewAttention' component={NewAttentionScreen}/>
    </Stack.Navigator>
)

export default NurseAttentionStack;