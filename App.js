import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer,useNavigation, StyleSheet,CommonActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { Button } from 'react-native'
<<<<<<< HEAD
import {LoginScreen,Hashmalie,} from './src/screens'
=======
import {
  LoginScreen,
  Hashmalie,
} from './src/screens'
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`logout`}
<<<<<<< HEAD
      color="black"
=======
      color="white"
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
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
        >
<<<<<<< HEAD
=======
         
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
          <Stack.Screen name="LoginScreen" component={LoginScreen}  />
          <Stack.Screen name="Hashmalie" component={Hashmalie} options={{headerRight: 
          ({navigation,route}) => (
            <GoToButton screenName="LoginScreen" />
    ),}} />
<<<<<<< HEAD

=======
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
