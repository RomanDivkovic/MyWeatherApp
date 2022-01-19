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
import api_key from '../components/apiKey'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/customButton'

export default function CurrentScreen() {
  const [result, setResult] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadWeather = async () => {
    setRefreshing(true)

    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Denied..')
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    })

    // `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    try {
      const response = await api.get(
        `weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${api_key}`
      )
      setResult(response.data)
      console.log('Result on api call: ', result)
    } catch (error) {
      setResult(error.toString())
      console.log('Error Result from api call', result)
    }

    setRefreshing(false)
  }

  useEffect(() => {
    loadWeather()
  }, [])

  if (!result || result === null) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
        <CustomButton
          title="Search"
          onPress={() => {
            const searchApi = async () => {
              try {
                const response = await api.get(
                  `weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${api_key}`
                )
                setResult(response.data)
                console.log('Result on api call in btn: ', response.data)
                return result
              } catch (error) {
                setResult(error.toString())
                console.log('Error Result from api call', result)
              }
            }
            searchApi()
          }}
        />
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
        <View style={styles.container}>
          <Text style={textStyles.Country}>
            {result.name}, {result.sys.country}
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
            {result.main.temp}ºC
          </Text>
          <Text style={textStyles.feelsLike}>
            Feels like: {result.main.feels_like}ºC
          </Text>
          <Text>{result.weather.description}</Text>
          <Image
            style={styles.pic}
            source={{
              //http://openweathermap.org/img/w/${props.icon}.png
              uri: `https://openweathermap.org/img/w/${result.weather.icon}.png`
              // uri: 'https:' + result.weather.icon
            }}
          />
          <Text>WIND SPEED: {result.wind.speed}</Text>
          <Text>Humidity: {result.main.humidity}</Text>
        </View>
        <CustomButton
          title="Search"
          onPress={() => {
            loadWeather()
            // const searchApi = async () => {
            //   try {
            //     const response = await api.get(
            //       `weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${api_key}`
            //     )
            //     setResult(response.data)
            //     console.log('Result on api call in btn: ', response.data)
            //     return result
            //   } catch (error) {
            //     setResult(error.toString())
            //     console.log('Error Result from api call', result)
            //   }
            // }
            // searchApi()
          }}
        />
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
