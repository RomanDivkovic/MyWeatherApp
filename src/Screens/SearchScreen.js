import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  FlatList,
  ImageBackground
} from 'react-native'
import CustomButton from '../components/customButton'
import CustomInput from '../components/customInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../Utils/api/api'
import api_key from '../components/apiKey'

export default function SearchScreen({ navigation }) {
  const [result, setResult] = useState([])
  const [text, onTextChange] = useState('')
  const [loaded, setLoaded] = useState(true)

  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg'
  }

  if (loaded === true || result.city.name === undefined) {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
            <Text style={textStyles.feelsLike}>
              {result.list[0].main.feels_like}ºC
            </Text>

            <Text style={textStyles.main}>
              {result.list[0].weather[0].main}
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

          <View style={styles.eachList}>
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
              alert('Need to save to db')
            }}
          />
        </ScrollView>
      </ImageBackground>
    )
  }
  function getWeather(text) {
    // useEffect(() => {})
    // if (text === undefined) {
    //   alert(result)
    // }
    const searchApi = async () => {
      try {
        const response = await api.get(
          `forecast?q=${text}&units=metric&appid=${api_key}`
        )
        setResult(response.data)
        // console.log('forecast log from btn: ', response.data)
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
    height: 150
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  // viewList: {
  //   alignItems: 'center',
  //   padding: 20
  // },
  eachList: {
    margin: 2,
    flex: 1
  },
  item: {
    margin: 10,
    flex: 0.9,
    borderWidth: 2.5,
    borderColor: 'lightgrey',
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
    fontFamily: 'Montserrat1'
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
    fontFamily: 'Montserrat1'
  },
  humidity: {
    color: '#fff',
    fontFamily: 'Montserrat1'
  },
  visibility: {
    color: '#fff',
    fontFamily: 'Montserrat1'
  }
})
