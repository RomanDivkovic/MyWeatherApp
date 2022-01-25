import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  FlatList
} from 'react-native'
import CustomButton from '../components/customButton'
import CustomInput from '../components/customInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../Utils/api/api'
import api_key from '../components/apiKey'

export default function SearchScreen() {
  const [result, setResult] = useState([])
  const [text, onTextChange] = useState('')
  const [loaded, setLoaded] = useState(true)

  if (loaded === true) {
    return (
      <ScrollView>
        <SafeAreaView>
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
                  Alert(result)
                }
              }
              searchApi()
            }}
          />
        </SafeAreaView>
      </ScrollView>
    )
  } else {
    return (
      <View style={{ height: '100%' }}>
        <ScrollView>
          <SafeAreaView>
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

            <View style={styles.viewList}>
              <View style={styles.eachList}>
                <FlatList
                  data={result.list}
                  horizontal
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text style={{ fontFamily: 'Montserrat1' }}>
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
                          alignSelf: 'center',
                          fontFamily: 'Montserrat2'
                        }}
                      >
                        {item.weather[0].description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat3',
                          alignSelf: 'center'
                        }}
                      >
                        Current: {item.main.temp}ºC
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat3',
                          alignSelf: 'center'
                        }}
                      >
                        Feels like: {item.main.feels_like}ºC
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat3',
                          alignSelf: 'center'
                        }}
                      >
                        Min: {item.main.temp_min}ºC
                      </Text>
                      <Text
                        style={{
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
            </View>

            <CustomButton
              title="Search"
              onPress={() => {
                getWeather(text)
              }}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    )
  }
  function getWeather(text) {
    // useEffect(() => {})
    const searchApi = async () => {
      try {
        const response = await api.get(
          `forecast?q=${text}&units=metric&appid=${api_key}`
        )
        setResult(response.data)
        // console.log('forecast log from btn: ', response.data)
        // console.log(result.list.length, 'result list length')
        return result
      } catch (error) {
        setResult(error.toString())
        console.log('Error Result from api call', result)
      }
    }
    searchApi()
  }
}

// Style for my components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
  },
  viewList: {
    // backgroundColor: 'grey',
    alignItems: 'center',
    padding: 20
  },
  eachList: {
    margin: 2,
    flex: 1
  },
  item: {
    margin: 10,
    flex: 0.9,
    borderWidth: 2.5,
    borderColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
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
