import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default function Search(props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
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
    // margin: 5,
    // padding: 10,
    minWidth: 200,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#3b4053',
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  }
})
