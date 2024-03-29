import { format } from 'prettier'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import Background from '../components/Background'
import { LinearGradient } from 'expo-linear-gradient'
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Loader from './Loader'
const Profile = (props) => {
  var toke = 'Token ' + props.toke + ' '
  var url =
    'https://hashmali-backend.herokuapp.com/api/worker/' + props.id + '/view/'
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
          <Title style={{ fontWeight: 'bold' }}>My Profile</Title>
        </View>

        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="account-box" size={32} color="orange" />
            <Text style={styles.myText}>
              {items.second_name + ' ' + items.first_name}
            </Text>
          </View>
        </Card>

        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color="orange" />
            <Text style={styles.myText}>{items.email}</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="phone" size={32} color="orange" />
            <Text style={styles.myText}>{items.phone}</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="home" size={24} color="orange" />
            <Text style={styles.myText}>{items.address}</Text>
          </View>
        </Card>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Button
            icon="account-edit"
            mode="contained"
            onPress={() =>
              navigation.navigate('EditProfile', {
                first_name: items.first_name,
                second_name: items.second_name,
                email: items.email,
                phone: items.phone,
                address: items.address,
                toke: toke,
                id: props.id,
              })
            }
          >
            Edit
          </Button>
        </View>
      </View>
    )
  } else {
    return <Loader></Loader>
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    backgroundColor: 'black',

    margin: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  myText: {
    fontSize: 22,
    color: 'white',
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
