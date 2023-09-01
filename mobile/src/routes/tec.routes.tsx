//NAVIGATION
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//SCREENS
import { Home } from '../screens/Home'
//TYPES
import { RootStackParamList } from '../types/navigation'


const Stack = createNativeStackNavigator<RootStackParamList>()
const Tabs = createBottomTabNavigator<RootStackParamList>()

export function TecnicoRoutes() {
  return (
    <Tabs.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name='Home' component={Home}/>
    </Tabs.Navigator>
  )
}