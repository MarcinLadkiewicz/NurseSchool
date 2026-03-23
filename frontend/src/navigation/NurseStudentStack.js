import { createStackNavigator } from '@react-navigation/stack';
import StudentsScreen from '../screens/nurse/StudentsScreen';
import StudentDetailScreen from '../screens/nurse/StudentDetailScreen';
import NewStudentScreen from '../screens/nurse/NewStudentScreen';
import NewAllergyScreen from '../screens/nurse/NewAllergyScreen';
import NewAttentionScreen from '../screens/nurse/NewAttentionScreen';
import EditStudentScreen from '../screens/nurse/EditStudentScreen';
import EditAllergy from '../screens/nurse/EditAllergyScreen';
import AttentionDetailScreen from '../screens/nurse/AttentionDetailScreen';
import NewPathologyScreen from '../screens/nurse/NewPathologyScreen';


const Stack = createStackNavigator();

const NurseStudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StudentScreen" component={StudentsScreen} />
    <Stack.Screen name="Detail" component={StudentDetailScreen} />
    <Stack.Screen name="EditStudent" component={EditStudentScreen}/>
    <Stack.Screen name="AddStudent" component={NewStudentScreen} />
    <Stack.Screen name="NewAllergy" component={NewAllergyScreen} />
    <Stack.Screen name="EditAllergy" component={EditAllergy}/>
    <Stack.Screen name="NewAttention" component={NewAttentionScreen} />
    <Stack.Screen name="AttentionDetail" component={AttentionDetailScreen}/>
    <Stack.Screen name="NewPathology" component={NewPathologyScreen} />
  </Stack.Navigator>
);
    
export default NurseStudentStack;