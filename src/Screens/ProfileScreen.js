import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text, View } from 'react-native'
import { auth } from '../../firebase'
import CustomButton from '../components/customButton'

export default function ProfileScreen() {
  const navigation = useNavigation()

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <View>
      <Text>Email: {auth.currentUser?.email}</Text>
      <CustomButton title="Sign out" onPress={handleSignOut} />
    </View>
  )
}
