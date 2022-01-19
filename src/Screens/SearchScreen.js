import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native'
import CustomButton from '../components/customButton'
import CustomInput from '../components/customInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../Utils/api/api'
import api_key from '../components/apiKey'
import backgroundPhoto from '../assets/photo/sunrise.jpg'

export default function SearchScreen() {
  const [result, setResult] = useState([])
  const [text, onTextChange] = useState('')
  const [loaded, setLoaded] = useState(true)

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

    try {
      const response = await api.get(
        'lat=' + location.coords.latitude + 'long=' + location.coords.longitude
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

  // to get forcast and not just current call this
  //https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  if (loaded === true) {
    return (
      <ImageBackground
        source={backgroundPhoto}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
          <ScrollView>
            <CustomInput onChangeText={onTextChange} value={text} />
            <CustomButton
              title="Search"
              onPress={() => {
                const searchApi = async () => {
                  try {
                    const response = await api.get(
                      `weather?q=${text}&units=metric&appid=${api_key}`
                    )
                    setResult(response.data)
                    setLoaded(false)
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
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground
        source={backgroundPhoto}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
          <ScrollView>
            <CustomInput onChangeText={onTextChange} value={text} />
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
                const searchApi = async () => {
                  try {
                    const response = await api.get(
                      `weather?q=${text}&units=metric&appid=${api_key}`
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
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

// Style for my components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 150,
    height: 150
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  }
})

// Style for text in components
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
