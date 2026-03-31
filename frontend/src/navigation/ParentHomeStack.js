import { createStackNavigator } from "@react-navigation/stack";
import ParentsHomeScreen from "../screens/parents/ParentsHomeScreen";
import ParentChildDetail from '../screens/parents/ParentChildDetail';
import AttentionDetailScreen from '../screens/nurse/AttentionDetailScreen';


const Stack = createStackNavigator();

const ParentsHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={ParentsHomeScreen} />
    <Stack.Screen name="ChildDetail" component={ParentChildDetail} />
    <Stack.Screen name="AttentionDetail" component={AttentionDetailScreen}/>
  </Stack.Navigator>
);

export default ParentsHomeStack;
