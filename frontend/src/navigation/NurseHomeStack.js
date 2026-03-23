import { createStackNavigator } from "@react-navigation/stack";
import NurseHomeScreen from "../screens/nurse/NurseHomeScreen";
import AttentionDetailScreen from "../screens/nurse/AttentionDetailScreen";

const Stack = createStackNavigator();

const NurseHomeStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={NurseHomeScreen}/>
        <Stack.Screen name='AttentionDetail' component={AttentionDetailScreen}/>
        
    </Stack.Navigator>
)

export default NurseHomeStack;