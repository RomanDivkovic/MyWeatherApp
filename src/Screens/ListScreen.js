import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as firebase from 'firebase'
import { auth } from '../../firebase'
import api from '../Utils/api/api'
import api_key from '../components/apiKey'
import CustomButton from '../components/customButton'

/*
Need to let user choice to delete saved locations.
Also need to figuere out if we should save the temp or call the city name here.
*/

export default function ListScreen() {
  // const savedCity = props.route.params
  const [dbCity, setDbCity] = useState([])
  const [result, setResult] = useState([])
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg'
  }

  getDataFromDB()
  getAllCitiesWeather(dbCity)

  /**
   * Gets the data from the firebase realtime database for thet specific user
   */
  function getDataFromDB() {
    const dbRef = firebase.database().ref()
    dbRef
      .child('users')
      .child(auth.currentUser?.uid)
      .child('cities')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val())
          setDbCity(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  //Testing
  // dbCity.forEach((element) => {
  //   console.log(
  //     'My log to test getting city and then get weather :',
  //     element.city
  //   )
  // })

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dbCity}
          renderItem={({ item }) => (
            <View style={styles.weatherCard}>
              <Text style={styles.text}>{item.city}</Text>
              <Image
                style={styles.pic}
                source={{
                  uri: `http://openweathermap.org/img/w/${item.icon}.png`
                }}
              />
              <Text style={styles.temp}>{item.temp} ºC</Text>
              {/* <CustomButton /> */}
            </View>
          )}
          keyExtractor={(cities) => cities.city}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

//Testing can get cities need to figuer out how to just loop the length of the array instead of all the time
// but getting the data from db is no problem
function getAllCitiesWeather(dbCity) {
  for (let index = 0; index < dbCity.length; index++) {
    const element = dbCity[index]
  }
  // dbCity.forEach((element) => {
  //   console.log(element.city)
  //   const searchApi = async () => {
  //     try {
  //       const response = await api.get(
  //         `forecast?q=${element.city}&units=metric&appid=${api_key}`
  //       )
  //       setResult(response.data)
  //       console.log('forecast log from btn: ', response.data)
  //       // console.log(result.list.length, 'result list length')
  //     } catch (error) {
  //       setResult(error.toString())
  //       alert(result)
  //     }
  //   }
  //   searchApi()
  // })
}

function deletePlace() {
  alert('Need to delete place')
}

const styles = StyleSheet.create({
  weatherCard: {
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
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat1',
    fontSize: 22,
    lineHeight: 30
    // backgroundColor: '#000000c0'
  },
  pic: {
    marginRight: 10,
    width: 50,
    height: 50,
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    alignSelf: 'center'
  },
  temp: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat1'
    // lineHeight: 20
  }
})
