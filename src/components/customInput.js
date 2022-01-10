import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default function Search(props) {
  const [cityName, setCityName] = useState('')

  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Enter City Name or Zip Code"
        onChangeText={props.onChangeText}
        value={props.value}
        keyboardType="default"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#3b4053',
    borderWidth: 1,
    borderRadius: 8,
    // color: 'white',
    marginBottom: 8
  }
})
