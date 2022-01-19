import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'

/* My custom button created to use in application where its needed, button has design here and an props to send to other screens and they can add title and onPress */

export default function CustomButton(props) {
  return (
    <View style={styles.viewBackground}>
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgrey' : '#0077b6'
          },
          styles.viewButton
        ]}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </Pressable>
    </View>
  )
}

// Button design
const styles = StyleSheet.create({
  viewBackground: {
    maxHeight: 50,
    margin: 5
    // backgroundColor: '#F8F9FA'
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Montserrat1',
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
