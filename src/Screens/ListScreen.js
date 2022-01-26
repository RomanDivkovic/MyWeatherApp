import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as firebase from 'firebase'

/*
LEFT TO DO IS FIX THE BACKGROUND IN ON THE APP AND ALSO IMPLIMENT FIREBASE OR SOMETHING SO USER CAN SAVE LOCATION AND IN THE LIST SCREEN CALL SAVED LOCATIONS TO LOOP THRU AND SHOWING THEM WITH NAME, TEMP AND ICON
*/

export default function ListScreen(props) {
  const savedCity = props.route.params
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg'
  }

  // Get's the city saved
  firebase
    .database()
    .ref('user')
    .on('value', (snapshot) => {
      const city = snapshot.val().weather
      console.log('City: ' + city)
    })

  // const dbRef = firebase.database().ref()
  // dbRef
  //   .child('user')
  //   .child(userId)
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val())
  //     } else {
  //       console.log('No data available')
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
      {/* <View>
        <Text style={styles.Text}>Listscreen</Text>
      </View> */}
    </SafeAreaView>
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
