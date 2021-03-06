<<<<<<< HEAD
 import React from 'react'
=======
import React from 'react'
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
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
<<<<<<< HEAD
import CreateReport from './CreateReport'

import Tasks from './Tasks'
import { createStackNavigator } from '@react-navigation/stack'
const Tab = createMaterialBottomTabNavigator();
const ReportStack=createStackNavigator()

const ReportStackScreen=()=>(
  <ReportStack.Navigator  >
  <ReportStack.Screen name="Reports" component={Reports}   options={{
    headerShown: false
  }}
  
  />
  <ReportStack.Screen name="CreateReport" component={CreateReport}/>
  </ReportStack.Navigator>

)




=======
import Tasks from './Tasks'
const Tab = createMaterialBottomTabNavigator();
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
function MyTabs({navigation,toke,id}) {


  return (
<<<<<<< HEAD
		<Tab.Navigator   
		    initialRouteName="About"
=======
		<Tab.Navigator
    
		initialRouteName="About"
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
        shifting={true}
        labeled={true}
        sceneAnimationEnabled={false}
        activeColor="white"
        inactiveColor="white"
        screenOptions={{
<<<<<<< HEAD
        headerTitleStyle: {
        fontWeight: 'bold',
         color: 'white',
=======
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
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
  children={()=><About toke={toke} id={id}/>}

	options={{
	  tabBarLabel: 'Home',
	  tabBarIcon: ({ color }) => (
		<FontAwesome name="h-square" size={26} color="white" />
	  ),
	}}
  />
			<Tab.Screen
        name="Profile"
        children={()=><Profile toke={toke} id={id}/>}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
			<MaterialIcons name="person-pin" size={28} color="white" />
          ),
        }}
      />
	  <Tab.Screen
        name="Reports"
<<<<<<< HEAD
        children={()=><ReportStackScreen toke={toke} id={id}/>}
=======
        children={()=><Reports toke={toke} id={id}/>}
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80

        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="Tasks"
        children={()=><Tasks toke={toke} id={id}/>}

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
  const {toke,id}=route.params

  return (
   <NavigationContainer independent={true} >
      
    <MyTabs toke={toke} id={id}/>
  </NavigationContainer>
  )
}

export default Hashmalie


