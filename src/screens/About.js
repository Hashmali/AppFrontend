import React from 'react'
import { Text, View } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

const About = (props) => {
  const { t } = useTranslation()

  return (
    <Background>
      <Logo />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>{t('Welcome to the hashmalie App')}</Text>
        <Text style={styles.text}>Enjoy!</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 40,
    paddingBottom: 40,
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 18,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    borderColor: '#fff',
    overflow: 'hidden',
  },
})
export default About
