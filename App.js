import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

import SearchScreen from './src/Screens/SearchScreen'
import ListScreen from './src/Screens/ListScreen'

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

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen name="Home" component={SearchScreen} />
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
