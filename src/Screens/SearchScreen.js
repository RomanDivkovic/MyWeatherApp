import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import CustomButton from '../components/customButton'
import CustomInput from '../components/customInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../Utils/api/api'

export default function SearchScreen() {
  const [result, setResult] = useState([])
  const [text, onTextChange] = useState('')

  if (result.length === 0 || result === undefined) {
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
                    text + '&days=5&aqi=no&alerts=no'
                  )
                  setResult(response.data)
                  console.log('Result on api call in btn: ', result)
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
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
        <CustomInput onChangeText={onTextChange} value={text} />
        <View style={styles.container}>
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
        <CustomButton
          title="Search"
          onPress={() => {
            const searchApi = async () => {
              try {
                const response = await api.get(text + '&aqi=no')
                setResult(response.data)
                console.log('Result on api call in btn: ', result)
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
}

// Style for my components
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 150,
    height: 150
    // margin: 10
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
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    top: 10
  },
  viewButton: {
    minHeight: 50,
    borderRadius: 15,
    margin: 2
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
