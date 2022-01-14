import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

import SearchScreen from './src/Screens/SearchScreen'
import ListScreen from './src/Screens/ListScreen'
import CurrentScreen from './src/Screens/CurrentScreen'
import LogInScreen from './src/Screens/LogInScreen'
import ProfileScreen from './src/Screens/ProfileScreen'

import { auth } from './firebase'

export default function App() {
  const Tab = createBottomTabNavigator()

  const [loaded] = useFonts({
    Montserrat1: require('./src/assets/fonts/Montserrat-BoldItalic.ttf'),
    Montserrat2: require('./src/assets/fonts/Montserrat-Regular.ttf'),
    Montserrat3: require('./src/assets/fonts/Montserrat-SemiBoldItalic.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <NavigationContainer>
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

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen
          options={{ tabBarStyle: { display: 'none' } }}
          name="Login"
          component={LogInScreen}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Current" component={CurrentScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="List" component={ListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
