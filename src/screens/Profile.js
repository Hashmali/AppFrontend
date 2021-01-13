import React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image} from 'react-native';
import Background from '../components/Background'
const Profile = (props) => {
	useEffect(()=>{
		fetchItems();
	  },[]);
	var toke="Token " + props.toke+" "
	var url='https://656d9eb045df.ngrok.io/api/worker/'+props.id+'/view/'
	const requestOptions =
 	{
  		method: 'GET',
  		headers: { 'Content-Type': 'application/json',
  		'Authorization' : toke,}
	};
	console.log(JSON.stringify(url))
		const [items,setItems]=useState([])
		const [status,setStatus]=useState("")
		const fetchItems= async ()=>{
		const data=await fetch(url,requestOptions).catch(error=>console.error(error));
	console.log(JSON.stringify(data))

		setStatus(data.status)
		const items=await data.json();
		setItems(items);
		};
		if(status=="200"){
			return (
				<Background>
				<View style={{  alignItems: 'center' }}>
				<Image
					source={{
						uri: items.image,
					}}
					style={styles.pic}
					/>


				<Text style={styles.text} >{items.second_name+" "+items.first_name}</Text>
				<Text style={styles.text1} >{items.phone}</Text>
				</View>
				</Background>
			);
		}
	else{
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
}
const styles = StyleSheet.create({
	pic: {
		width: 260,
		height: 260,
		borderRadius: 260 / 2,
		overflow: "hidden",
		borderWidth: 3,
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