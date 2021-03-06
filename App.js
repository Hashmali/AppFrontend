import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer,useNavigation, StyleSheet,CommonActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { Button } from 'react-native'
<<<<<<< HEAD
=======
<<<<<<< HEAD
import {LoginScreen,Hashmalie,} from './src/screens'
=======
>>>>>>> 0e806324882abc2fa1ccd8a1e2d1d82a47dc441c
import {
  LoginScreen,
  Hashmalie,
} from './src/screens'
<<<<<<< HEAD
=======
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
>>>>>>> 0e806324882abc2fa1ccd8a1e2d1d82a47dc441c
function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`logout`}
<<<<<<< HEAD
      color="white"
=======
<<<<<<< HEAD
      color="black"
=======
      color="white"
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
>>>>>>> 0e806324882abc2fa1ccd8a1e2d1d82a47dc441c
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
<<<<<<< HEAD
=======
         
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
>>>>>>> 0e806324882abc2fa1ccd8a1e2d1d82a47dc441c
          <Stack.Screen name="LoginScreen" component={LoginScreen}  />
          <Stack.Screen name="Hashmalie" component={Hashmalie} options={{headerRight: 
          ({navigation,route}) => (
            <GoToButton screenName="LoginScreen" />
    ),}} />
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> 4d1101d4fe015d9f2229cc42d66820804559aa80
>>>>>>> 0e806324882abc2fa1ccd8a1e2d1d82a47dc441c
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
