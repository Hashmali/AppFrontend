import { format } from 'prettier'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import Background from '../components/Background'
import { LinearGradient } from 'expo-linear-gradient'
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
const Profile = (props) => {
  useEffect(() => {
    fetchItems()
  }, [])
  var toke = 'Token ' + props.toke + ' '
  var url =
    'https://hashmali-backend.herokuapp.com/api/worker/' + props.id + '/view/'
  var url =
    'https://hashmali-backend.herokuapp.com/api/worker/' + props.id + '/view/'
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: toke },
  }
  console.log(JSON.stringify(url))
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  const fetchItems = async () => {
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    )
    console.log(JSON.stringify(data))

    setStatus(data.status)
    const items = await data.json()
    setItems(items)
  }
  if (status == '200') {
    return (
      <View style={StyleSheet.root}>
        <LinearGradient
          colors={['#2e2e2e', '#2e2e2e']}
          style={{ height: '20%' }}
        ></LinearGradient>

        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: items.image }} style={styles.pic} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Title>My Profile</Title>
        </View>

        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="account-box" size={32} color="black" />
            <Text style={styles.myText}>
              {items.second_name + ' ' + items.first_name}
            </Text>
          </View>
        </Card>

        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color="black" />
            <Text style={styles.myText}>{items.email}</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="phone" size={32} color="black" />
            <Text style={styles.myText}>{items.phone}</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="home" size={24} color="black" />
            <Text style={styles.myText}>{items.address}</Text>
          </View>
        </Card>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Button
            icon="account-edit"
            mode="contained"
            onPress={() => console.log('pressed')}
          >
            Edit
          </Button>
        </View>
      </View>
    )
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator />
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  myText: {
    fontSize: 22,
    marginTop: 3,
    marginLeft: 5,
  },

  pic: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    marginTop: -50,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
export default Profile
