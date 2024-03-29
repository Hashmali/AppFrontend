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
  const [loader, setLoader] = useState(false)

  const fetchItems = async () => {
    setLoader(true)
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    )
    setLoader(false)

    setStatus(data.status)
    const items = await data.json()
    setItems(items)
  }

  useEffect(() => {
    fetchItems()
  }, [])

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

  if (loader) {
    return <Loader></Loader>
  }

  if (status == '200') {
    const userTasks = items.filter((item) => item.worker.id === props.id)

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={userTasks}
          renderItem={({ item }) => {
            return renderList(item)
          }}
          keyExtractor={(item) => `${item.id}`}
          onRefresh={() => fetchItems()}
          refreshing={loader}
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
    backgroundColor: 'black',
  },
  cardView: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    marginLeft: 10,
    color: 'white',

    alignItems: 'center',
    fontWeight: 'bold',
  },
})
