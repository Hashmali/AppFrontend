import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Loader from './Loader'

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
  var toke = 'Token ' + props.toke + ' '
  var url = 'https://hashmali-backend.herokuapp.com/api/mission/'
  const navigation = useNavigation()
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: toke },
  }

  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  const fetchItems = async () => {
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    )
    setStatus(data.status)
    const items = await data.json()
    setItems(items)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchItems()
    })

    return unsubscribe
  }, [navigation])

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        key={item.id}
        onPress={() => navigation.push('ViewTask', { item: item })}
      >
        <View style={styles.cardView}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </Card>
    )
  }

  if (status == '200') {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return renderList(item)
          }}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    )
  } else {
    return <Loader></Loader>
  }
}
export default Tasks

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    padding: 5,
  },
  cardView: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    marginLeft: 10,
    alignItems: 'center',
    fontWeight: 'bold',
  },
})
