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

  function removeAccount() {
    alert('Need to delete account')
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={Styles.email}>Email: {auth.currentUser?.email}</Text>
      <CustomButton title="Sign out" onPress={handleSignOut} />
      <CustomButton title="Delete account" onPress={removeAccount} />
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
