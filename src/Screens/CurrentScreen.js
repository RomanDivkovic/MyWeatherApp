import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl
} from 'react-native'
import * as Location from 'expo-location'
import api from '../Utils/api/api'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CurrentScreen() {
  const [result, setResult] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadWeather = async () => {
    setRefreshing(true)

    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied')
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    })

    try {
      const response = await api.get(
        `$lat=${location.coords.latitude}long=${location.coords.longitude}days=5&aqi=no&alerts=no`
      )
      setResult(response.data)
      console.log('Result on api call in btn: ', result)
    } catch (error) {
      setResult(error.toString())
      console.log('Error Result from api call', result)
    }

    setRefreshing(false)
  }

  useEffect(() => {
    loadWeather()
  }, [])

  if (!result) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              loadWeather()
            }}
            refreshing={refreshing}
          />
        }
      >
        <View style={styles.current}>
          <Text style={textStyles.Country}>{result.location.name}</Text>
          <Text style={textStyles.state}>
            {result.location.region} in {''}
            {result.location.country}
          </Text>

          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              shadowOffset: {
                width: 5,
                height: 5
              },
              shadowOpacity: 0.4,
              shadowRadius: 2
            }}
          >
            {result.current.temp_c}ºC
          </Text>
          <Text style={textStyles.feelsLike}>
            Feels like: {result.current.feelslike_c}ºC
          </Text>
          <Text>{result.current.condition.text}</Text>
          <Image
            style={styles.pic}
            source={{
              uri: 'https:' + result.current.condition.icon
            }}
          />
          <Text>WIND SPEED: {result.current.wind_mph}mph</Text>
          <Text>Humidity: {result.current.humidity}</Text>
          <Text>Visibility: {result.current.vis_km}km</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const textStyles = StyleSheet.create({
  Country: {
    fontSize: 30,
    fontFamily: 'Montserrat1',
    padding: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  state: {
    fontFamily: 'Montserrat2',
    paddingBottom: 20,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  feelsLike: {
    paddingBottom: 20,
    fontFamily: 'Montserrat3',
    fontSize: 15,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  }
})

// Style for my components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF6',
    alignItems: 'center'
  },
  pic: {
    width: 150,
    height: 150
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  viewBackground: {
    maxHeight: 50,
    backgroundColor: '#F8F9FA'
  },

  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
})
