import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

/*
LEFT TO DO IS FIX THE BACKGROUND IN ON THE APP AND ALSO IMPLIMENT FIREBASE OR SOMETHING SO USER CAN SAVE LOCATION AND IN THE LIST SCREEN CALL SAVED LOCATIONS TO LOOP THRU AND SHOWING THEM WITH NAME, TEMP AND ICON
*/

export default function ListScreen(props) {
  const [myCities, setMyCities] = useState([])
  const savedCity = props.route.params
  // useEffect(() => {
  //   const getWeather = async () => {
  //     try {
  //       const response = await api.get(text + '&aqi=no')
  //       setMyCities(response.data)
  //       console.log('Result on useEffect call in screen direcly: ', myCities)
  //       return result
  //     } catch (error) {
  //       setResult(error.toString())
  //       console.log('Error Result from api call', result)
  //     }
  //   }
  //   getWeather()
  // }, [])

  // console.log(savedCity.location)

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.Text}>Listscreen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    textAlign: 'center'
  }
})
