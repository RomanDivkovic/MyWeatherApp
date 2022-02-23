import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { auth } from '../../firebase'
import CustomButton from '../components/customButton'

export default function ProfileScreen(props) {
  const navigation = useNavigation()
  const email = props.route.params

  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg'
  }

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
    <ImageBackground source={image} resizeMode="cover" style={Styles.image}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <Text style={Styles.email}>Email: {auth.currentUser?.email}</Text>
        <CustomButton title="Sign out" onPress={handleSignOut} />
        <CustomButton title="Delete account" onPress={removeAccount} />
      </View>
    </ImageBackground>
  )
}

const Styles = StyleSheet.create({
  email: {
    fontFamily: 'Montserrat3',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
    margin: 25,
    color: 'white'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  }
})
