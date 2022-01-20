import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { auth } from '../../firebase'
import CustomButton from '../components/customButton'

export default function ProfileScreen(props) {
  const navigation = useNavigation()
  const email = props.route.params

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={Styles.email}>Email: {auth.currentUser?.email}</Text>
      <CustomButton title="Sign out" onPress={handleSignOut} />
    </View>
  )
}

const Styles = StyleSheet.create({
  email: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
    margin: 25
  }
})
