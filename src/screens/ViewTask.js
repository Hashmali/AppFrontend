import { format } from 'prettier'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Linking } from 'react-native'
import Background from '../components/Background'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const ViewTask = (props) => {
  const {
    id,
    title,
    date,
    start_hour,
    ending_hour,
    description,
    project,
    worker,
    image,
  } = props.route.params.item
  return (
    <View style={styles.root}>
      <Card>
        <Card.Content>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'black',
              marginBottom: 10,
            }}
          >
            <Title style={{ fontWeight: 'bold', color: 'white' }}>
              {'Task Title: ' + title}
            </Title>
          </View>

          <Card style={styles.myCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name="date-range" size={32} color="orange" />
              <Text style={styles.myText}>{date}</Text>
            </View>
          </Card>

          <Card style={styles.myCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name="badge" size={32} color="orange" />
              <Text style={styles.myText}>
                {'Project: ' + project.project_code}
              </Text>
            </View>
          </Card>
          <Card style={styles.myCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name="engineering" size={32} color="orange" />
              <Text style={styles.myText}>
                {'Worker: ' + worker.first_name + ' ' + worker.second_name}
              </Text>
            </View>
          </Card>

          <Card style={styles.myCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name="description" size={32} color="orange" />
              <Text style={styles.myText}>{'Description: ' + description}</Text>
            </View>
          </Card>
        </Card.Content>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
    backgroundColor: 'black',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  myText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'white',
  },

  pic: {
    width: 250,
    height: 250,
    marginTop: 10,
  },
})
export default ViewTask
