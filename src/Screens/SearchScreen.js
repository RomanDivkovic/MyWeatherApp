import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground
} from 'react-native'
import CustomButton from '../components/customButton'
import CustomInput from '../components/customInput'
import api from '../Utils/api/api'
import api_key from '../components/apiKey'
import * as firebase from 'firebase'
import { auth } from '../../firebase'

export default function SearchScreen({ navigation }) {
  const [result, setResult] = useState([])
  const [text, onTextChange] = useState('')
  const [loaded, setLoaded] = useState(true)
  const [number, setNumber] = useState(0)

  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg'
  }

  if (loaded === true) {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ flex: 1, alignContent: 'center', padding: 10 }}>
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
                } catch (error) {
                  setResult(error.toString())
                  console.log('Error Result from api call', result)
                  alert(result)
                }
              }
              searchApi()
            }}
          />
        </View>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView>
          <CustomInput onChangeText={onTextChange} value={text} />
          <View style={styles.container}>
            <Text style={textStyles.Country}>
              {result.city.name}, {result.city.country}
            </Text>
            {/* <Text>{result.city.sunrise}</Text>
            <Text>{result.city.sunset}</Text> */}
            <Text
              style={{
                fontSize: 22,
                color: 'white',
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
            <Text>Feels like</Text>
            <Text style={textStyles.feelsLike}>
              {result.list[0].main.feels_like}ºC
            </Text>
            <Text style={textStyles.description}>
              {result.list[0].weather[0].description}
            </Text>
            <Image
              style={styles.pic}
              source={{
                uri: `http://openweathermap.org/img/w/${result.list[0].weather[0].icon}.png`
              }}
            />
            <Text style={textStyles.max}>
              Max: {result.list[0].main.temp_max}ºC
            </Text>
            <Text style={textStyles.min}>
              Min: {result.list[0].main.temp_min}ºC
            </Text>
            <Text style={textStyles.humidity}>
              Humidity: {result.list[0].main.humidity}
            </Text>
            <Text style={textStyles.visibility}>
              Visibility: {result.list[0].visibility}
            </Text>
          </View>

          {/* Forecast data from weather search */}
          <View>
            <FlatList
              data={result.list}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={{ fontFamily: 'Montserrat1', color: 'white' }}>
                    {item.dt_txt}
                  </Text>
                  <Image
                    style={styles.pic}
                    source={{
                      uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                      fontFamily: 'Montserrat2'
                    }}
                  >
                    {item.weather[0].description}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Montserrat3',
                      alignSelf: 'center'
                    }}
                  >
                    Current: {item.main.temp}ºC
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Montserrat3',
                      alignSelf: 'center'
                    }}
                  >
                    Feels like: {item.main.feels_like}ºC
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Montserrat3',
                      alignSelf: 'center'
                    }}
                  >
                    Min: {item.main.temp_min}ºC
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Montserrat3',
                      alignSelf: 'center'
                    }}
                  >
                    Max: {item.main.temp_max}ºC
                  </Text>
                </View>
              )}
              keyExtractor={(weather) => weather.dt_txt.toString()}
            />
          </View>

          <CustomButton
            title="Search"
            onPress={() => {
              getWeather(text)
            }}
          />
          <CustomButton
            title="Save place"
            onPress={() => {
              setDbData(result.city.name)
            }}
          />
        </ScrollView>
      </ImageBackground>
    )
  }

  function setDbData(text) {
    /**
     *
     * Need to fix so when user presses he saves another city and not write over the one that already exists
     *
     * Use this so it dont write over data
     * + result.city.name)
     * also use useeffect instead of adding a number each time
     */
    setNumber(number + 1)
    firebase
      .database()
      .ref('users/' + auth.currentUser?.uid + '/cities' + '/' + number)
      .set({
        city: text
      })
  }

  function getWeather(text) {
    const searchApi = async () => {
      try {
        const response = await api.get(
          `forecast?q=${text}&units=metric&appid=${api_key}`
        )
        setResult(response.data)
        console.log('forecast log from btn: ', response.data)
        // console.log(result.list.length, 'result list length')
      } catch (error) {
        setResult(error.toString())
        alert(result)
      }
    }
    searchApi()
  }
}

// Style for my components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 150,
    height: 150,
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    margin: 10,
    flex: 0.9,
    borderWidth: 2.5,
    borderColor: '#fff',
    shadowOffset: {
      width: 8,
      height: 8
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
})

// Style for text in components
const textStyles = StyleSheet.create({
  Country: {
    color: 'white',
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
    color: 'white',
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
    color: 'white',
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
    color: 'white',
    margin: 10,
    fontSize: 20,
    fontFamily: 'Montserrat1',
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  main: {
    color: 'white',
    margin: 10,
    fontSize: 20,
    fontFamily: 'Montserrat1'
  },
  min: {
    fontFamily: 'Montserrat1',
    color: '#fff'
  },
  max: {
    color: '#fff',
    fontFamily: 'Montserrat1',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  humidity: {
    color: '#fff',
    fontFamily: 'Montserrat1',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  visibility: {
    color: '#fff',
    fontFamily: 'Montserrat1',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  }
})
