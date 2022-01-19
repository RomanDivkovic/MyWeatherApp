import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../components/customButton'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScree() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Profile')
      }
    })

    return unsubscribe
  }, [])

  function handleSignUp() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log('Registered with:', user.email)
      })
      .catch((error) => alert(error.message))
  }

  function handleLogin() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log('Logged in with:', user.email)
      })
      .catch((error) => alert(error.message))
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton title="Login" onPress={() => handleLogin()} />
        <CustomButton title="Register" onPress={() => handleSignUp()} />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  buttonContainer: {
    width: '60%',
    marginTop: 40
  },
  input: {
    margin: 10,
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
