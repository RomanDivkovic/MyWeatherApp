import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

import SearchScreen from './src/Screens/SearchScreen'
import ListScreen from './src/Screens/ListScreen'
import CurrentScreen from './src/Screens/CurrentScreen'
import LogInScreen from './src/Screens/LogInScreen'
import ProfileScreen from './src/Screens/ProfileScreen'

export default function App() {
  const Tab = createBottomTabNavigator()
  const Stack = createBottomTabNavigator()

  const [loaded] = useFonts({
    Montserrat1: require('./src/assets/fonts/Montserrat-BoldItalic.ttf'),
    Montserrat2: require('./src/assets/fonts/Montserrat-Regular.ttf'),
    Montserrat3: require('./src/assets/fonts/Montserrat-SemiBoldItalic.ttf')
  })

  if (!loaded) {
    return null
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Current') {
              iconName = focused ? 'ios-home' : 'ios-home-outline'
            } else if (route.name === 'List') {
              iconName = focused ? 'ios-list' : 'ios-list-outline'
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search-outline'
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Current" component={CurrentScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="List" component={ListScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ tabBarStyle: { display: 'none' } }}
          name="Login"
          component={LogInScreen}
        />
        <Tab.Screen
          options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
          name="Profile"
          component={HomeTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
