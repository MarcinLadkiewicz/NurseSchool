import { createStackNavigator } from "@react-navigation/stack";
import ParentStudentScreen from '../screens/parents/ParentStudentScreen';
import ChildDetailScreen from "../screens/parents/ParentChildDetail";

const Stack = createStackNavigator();

const ParentChildStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='ChildsScreen' component={ParentStudentScreen} />
        <Stack.Screen name='ChildDetail' component={ChildDetailScreen}/>
    </Stack.Navigator>
)

export default ParentChildStack;