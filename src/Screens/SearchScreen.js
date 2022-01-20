import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, Alert } from 'react-native'
import CustomButton from '../components/customButton'
import CustomInput from '../components/customInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../Utils/api/api'
import api_key from '../components/apiKey'
import backgroundPhoto from '../assets/photo/sunrise.jpg'

/*

Need to display forcast of weather from every 3h at bottom now

*/

export default function SearchScreen() {
  const [result, setResult] = useState([])
  const [text, onTextChange] = useState('')
  const [loaded, setLoaded] = useState(true)

  if (loaded === true) {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
        <ScrollView>
          <CustomInput onChangeText={onTextChange} value={text} />
          <CustomButton
            title="Search"
            onPress={() => {
              const searchApi = async () => {
                try {
                  const response = await api.get(
                    `forecast?q=${text}&units=metric&appid=${api_key}`
                  )
                  setResult(response.data)
                  setLoaded(false)
                  // console.log('Result on api call in btn: ', response.data)
                  return result
                } catch (error) {
                  setResult(error.toString())
                  console.log('Error Result from api call', result)
                  Alert(result)
                }
              }
              searchApi()
            }}
          />
        </ScrollView>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
        <ScrollView>
          <CustomInput onChangeText={onTextChange} value={text} />
          <View style={styles.container}>
            <Text style={textStyles.Country}>
              {result.city.name}, {result.city.country}
            </Text>
            <Text>{result.city.sunrise}</Text>
            <Text>{result.city.sunset}</Text>
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
              {result.list[0].main.temp}ºC
            </Text>
            <Text tyle={textStyles.feelsLike}>
              {result.list[0].main.feels_like}ºC
            </Text>

            <Text style={styles.main}>{result.list[0].weather[0].main}</Text>
            <Text style={styles.description}>
              {result.list[0].weather[0].description}
            </Text>
            <Image
              style={styles.pic}
              source={{
                uri: `http://openweathermap.org/img/w/${result.list[0].weather[0].icon}.png`
              }}
            />
            <Text style={styles.max}>
              Max: {result.list[0].main.temp_max}ºC
            </Text>
            <Text style={styles.min}>
              Min: {result.list[0].main.temp_min}ºC
            </Text>
            <Text>Humidity: {result.list[0].main.humidity}</Text>
            <Text>Visibility: {result.list[0].visibility}</Text>
          </View>

          <CustomButton
            title="Search"
            onPress={() => {
              const searchApi = async () => {
                try {
                  const response = await api.get(
                    `forecast?q=${text}&units=metric&appid=${api_key}`
                  )
                  setResult(response.data)
                  console.log('Result on api call in btn: ', response.data)
                  // console.log(result.weather)
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
  },
  description: {
    margin: 10,
    fontSize: 20,
    fontFamily: 'Montserrat1'
  },
  main: {
    margin: 10,
    fontSize: 18,
    fontFamily: 'Montserrat1'
  },
  max: {
    fontSize: 16
  },
  min: {
    fontSize: 16
  }
})
