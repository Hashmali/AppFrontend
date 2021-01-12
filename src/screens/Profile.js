import React from 'react'
import { Text,View,StyleSheet,Image} from 'react-native';
import Background from '../components/Background'
const Profile = () => {
	return (
		<Background>
		<View style={{  alignItems: 'center' }}>
			<Image source={require('../assets/default.png')} style={styles.pic} />
			<Text style={styles.text} >Worker's First Name</Text>
			<Text style={styles.text} >Worker's Second Name</Text>
			<Text style={styles.text1} >Worker's Phone Number</Text>
			
		</View>
		</Background>
	);
}
const styles = StyleSheet.create({
	pic: {
	  marginTop: 4,
	  justifyContent: 'center',
	  width: 200,
	  height: 200,
	},
	text: {
		marginTop: 30,
		
		
    	//paddingVertical: 8,
		//justifyContent: 'center',
		fontSize: 24,
		fontWeight:'bold',
		borderColor: "black",
		textAlign: "center",
		overflow: 'hidden'
		},
		text1: {
			paddingTop:40,
			justifyContent: 'center',
			fontSize: 20,
			borderRadius: 6,
			borderColor: "black",
			}
  })
export default Profile;