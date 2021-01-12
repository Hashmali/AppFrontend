import React from 'react'
import { Text,View} from 'react-native';
//import Background1 from '../components/Background'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import {Ionicons, AntDesign,FontAwesome } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile'
import About from './About'
import Reports from './Reports'
import Tasks from './Tasks'





const Tab = createMaterialBottomTabNavigator();
function MyTabs({navigation}) {
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
          headerLeft:null,
          headerStyle:{
            backgroundColor:'black',
          }
         // headerShown: false,
        }}
        barStyle={{ backgroundColor: 'black' }}
    >
	<Tab.Screen
	name="About"
	component={About}
	options={{
	  tabBarLabel: 'Home',
	  tabBarIcon: ({ color }) => (
		<FontAwesome name="h-square" size={26} color="white" />
	  ),
	}}
  />
			<Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
			<MaterialIcons name="person-pin" size={28} color="white" />
          ),
        }}
      />
	  <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} color="white" />
          ),
        }}
      />
		</Tab.Navigator>
	);
}

const Hashmalie = ({route, navigation }) => {
  return (
   <NavigationContainer independent={true} >
      
    <MyTabs/>
  </NavigationContainer>
  )
}

export default Hashmalie


