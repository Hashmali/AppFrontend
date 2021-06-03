import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Loader from './Loader'
const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loader, setLoader] = useState(false)

  const onLoginPressed = () => {
    const phoneError = phoneValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    if (phoneError || passwordError) {
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      return
    }
    sendRequest()
  }

  function check(data) {
    if (data.token) {
      setLoader(false)

      navigation.navigate('Hashmalie', { toke: data.token, id: data.id })
    } else {
      setLoader(false)
      alert('failed to login...please try again!')
    }
  }

  function sendRequest() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: phone.value, password: password.value }),
    }
    setLoader(true)

    fetch(
      'https://hashmali-backend.herokuapp.com/api/worker/login/',
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        check(data)
      })
      .catch((error) => console.error(error))
  }
  if (loader) {
    return <Loader></Loader>
  }

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button icon="login" mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      <View style={styles.row}></View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default LoginScreen
