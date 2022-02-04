import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as firebase from 'firebase'
import { auth } from '../../firebase'
import { useEffect } from 'react/cjs/react.development'

/*
Now need to get that city and show weather forcast for each city here in a horizontal flatlist
*/

export default function ListScreen(props) {
  const savedCity = props.route.params
  const [dbCity, setDbCity] = useState([])
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg'
  }
  // Get's the city saved
  // firebase
  //   .database()
  //   .ref('user')
  //   .on('value', (snapshot) => {
  //     const city = snapshot.val().weather
  //     console.log('City: ' + city)
  //   })
  // useEffect({
  //   getDataFromDB()
  // })
  getDataFromDB()

  // const dbRef = firebase.database().ref()
  // dbRef
  //   .child('users')
  //   .child(auth.currentUser?.uid)
  //   .child('cities')
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val())
  //       setDbCity(snapshot.val())
  //       // console.log(dbCity)
  //     } else {
  //       console.log('No data available')
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  /**
   *
   * Gets the data from the firebase realtime database for thet specifik user
   *
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
          // console.log(dbCity)
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dbCity}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>{item.city}</Text>
            </View>
          )}
          keyExtractor={(cities) => cities.city}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center'
    // backgroundColor: '#000000c0'
  }
})
