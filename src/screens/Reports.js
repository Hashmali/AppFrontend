import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { Card, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Loader from './Loader'

const Reports = (props) => {
  const navigation = useNavigation()

  var toke = 'Token ' + props.toke + ' '
  var url = 'https://hashmali-backend.herokuapp.com/api/report/'
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
        onPress={() => navigation.push('ViewReport', { item: item })}
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
    const userReports = items.filter((item) => item.worker.id === props.id)
    return (
      <View>
        <FlatList
          data={userReports}
          renderItem={({ item }) => {
            return renderList(item)
          }}
          keyExtractor={(item) => `${item.id}`}
          onRefresh={() => fetchItems()}
          refreshing={loader}
        />
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={() =>
            navigation.push('CreateReport', {
              id: props.id,
              toke: toke,
            })
          }
          theme={{ colors: { accent: 'black' } }}
        />
      </View>
    )
  } else {
    return <Loader></Loader>
  }
}
export default Reports

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
    color: 'white',
    marginLeft: 10,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
  },
})
