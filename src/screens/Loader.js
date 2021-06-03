import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const App = () => (
  <View style={[styles.container]}>
    <ActivityIndicator />
    <ActivityIndicator
      style={[styles.centering, { transform: [{ scale: 3 }] }]}
      size="large"
      color="#000000"
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
})

export default App
