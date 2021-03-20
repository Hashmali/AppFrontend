import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native'
import Constants from 'expo-constants'
import Background from '../components/Background'

const DATA = [
  {
    title: '20.1.2021',
    data: ['work', 'work', 'work'],
  },
  {
    title: '21.1.2021',
    data: ['work', 'work', 'work', 'work'],
  },
  {
    title: '22.1.2021',
    data: ['work', 'work', 'work'],
  },
  {
    title: '23.1.2021',
    data: ['work', 'work'],
  },
]

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)
const Tasks = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  )
}

export default Tasks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 8,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  header: {
    fontSize: 32,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
})
