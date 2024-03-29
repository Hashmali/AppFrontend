import React from 'react'
import { Text, View } from 'react-native'
//import Background1 from '../components/Background'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import Profile from './Profile'
import EditProfile from './EditProfile'

import About from './About'
import Reports from './Reports'
import CreateReport from './CreateReport'
import ViewReport from './ViewReport'
import Tasks from './Tasks'
import ViewTask from './ViewTask'
import { createStackNavigator } from '@react-navigation/stack'
const Tab = createMaterialBottomTabNavigator()
const ReportStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const TaskStack = createStackNavigator()

const TasksStackScreen = (props) => (
  <TaskStack.Navigator>
    <TaskStack.Screen
      name="Tasks"
      children={() => <Tasks toke={props.toke} id={props.id} />}
      options={{
        headerShown: false,
      }}
    />
    <TaskStack.Screen
      name="ViewTask"
      component={ViewTask}
      options={{
        headerShown: false,
      }}
    />
  </TaskStack.Navigator>
)

const ReportStackScreen = (props) => (
  <ReportStack.Navigator>
    <ReportStack.Screen
      name="Reports"
      children={() => <Reports toke={props.toke} id={props.id} />}
      options={{
        headerShown: false,
      }}
    />
    <ReportStack.Screen name="CreateReport" component={CreateReport} />
    <ReportStack.Screen
      name="ViewReport"
      component={ViewReport}
      options={{
        headerShown: false,
      }}
    />
  </ReportStack.Navigator>
)

const ProfileStackScreen = (props) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      children={() => <Profile toke={props.toke} id={props.id} />}
      options={{
        headerShown: false,
      }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: false,
      }}
    />
  </ProfileStack.Navigator>
)

function MyTabs({ toke, id }) {
  return (
    <Tab.Navigator
      initialRouteName="About"
      shifting={true}
      labeled={true}
      sceneAnimationEnabled={false}
      activeColor="white"
      inactiveColor="white"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
        headerLeft: null,
        headerStyle: {
          backgroundColor: 'black',
        },
        // headerShown: false,
      }}
      barStyle={{ backgroundColor: 'black' }}
    >
      <Tab.Screen
        name="About"
        children={() => <About toke={toke} id={id} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="h-square" size={26} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileStackScreen toke={toke} id={id} />}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-pin" size={28} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        children={() => <ReportStackScreen toke={toke} id={id} />}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        children={() => <TasksStackScreen toke={toke} id={id} />}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const Hashmalie = ({ route, navigation }) => {
  const { toke, id } = route.params

  return (
    <NavigationContainer independent={true}>
      <MyTabs toke={toke} id={id} />
    </NavigationContainer>
  )
}

export default Hashmalie
