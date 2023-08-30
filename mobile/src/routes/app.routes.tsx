import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../screens/Home'
import { Login } from '../screens/Login'
import { RootStackParamList } from '../types/navigation'


const Stack = createNativeStackNavigator<RootStackParamList>()
const Tabs = createBottomTabNavigator<RootStackParamList>()

export function AppRoutes() {
  return (
    <Tabs.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name='Home' component={Home}/>
      <Tabs.Screen name='Login' component={Login} options={{
        tabBarShowLabel: false
      }}/>
    </Tabs.Navigator>
  )
}