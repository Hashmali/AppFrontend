import React from 'react'
import { Text,View} from 'react-native';
import { theme } from '../core/theme'
import Background from '../components/Background'
import Logo from '../components/Logo'
import { TouchableOpacity, StyleSheet } from 'react-native'
const About = (props) => {
	return (
		<Background>
		<Logo />
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={styles.text}>Welcome to the hashmalie App</Text>
			<Text style={styles.text}>{props.toke}</Text>
			<Text style={styles.text}>Enjoy!</Text>
		</View>
		</Background>
	);
}
const styles = StyleSheet.create({
  
	text: {
	paddingLeft:16,
	paddingRight:16,
    paddingTop:40,
    paddingBottom:40,
    borderWidth: 1,
	backgroundColor:'black',
	borderRadius:18,
	fontWeight: 'bold',
	color:'white',
	fontSize: 30,
	borderColor: '#fff',
	overflow: 'hidden'
	},})
export default About;