import React, { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'

export default function Position() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [userLocation, setUserLocation] = useState([])

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
    // cant get it to work
    // setUserLocation({
    //   lat: JSON.stringify(location.coords.latitude)
    // })
  }

  return (
    <View>
      <Text value={text}>{text}</Text>
    </View>
  )
}
