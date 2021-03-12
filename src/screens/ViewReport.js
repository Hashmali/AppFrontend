import { format } from 'prettier';
import React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image,Linking} from 'react-native';
import Background from '../components/Background'
import {LinearGradient} from 'expo-linear-gradient'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {MaterialIcons} from "@expo/vector-icons"

const ViewReport = (props) => {
    const {id,title,date,start_hour,finish_hour,description,project_code,image}=props.route.params.item
  return (
			<View style={StyleSheet.root}>
       
                <Card>
                <Card.Content>
                <View style={{alignItems:"center",justifyContent:"space-around"}}>
                <Title style={{fontWeight:"bold",}}>{" "+title}</Title>
                </View>
                <Paragraph style={{fontSize:22,padding:10,fontWeight:"bold"}}>Date: {date}</Paragraph>
                <Paragraph style={{fontSize:22,padding:10,fontWeight:"bold"}}>Working Hour: from {start_hour} until {finish_hour} </Paragraph>
                <Paragraph style={{fontSize:22,padding:10,fontWeight:"bold"}}>Project_Code: {project_code}</Paragraph>

               <Paragraph style={{fontSize:22,padding:10,fontWeight:"bold"}}>Description: {description}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri:image? image:"https://picsum.pho'tos/700" }} />
            </Card>









       		</View>
			);
		
}
const styles = StyleSheet.create({
	root:{
		flex:1,

	},
	myCard:{
		margin:3,
	},
	cardContent:{
		flexDirection:"row",
		padding:8,
	},
	myText:{
		fontSize:22,
		marginTop:3,
		marginLeft:5,

	},

	pic: {
		width: 140,
		height: 140,
		borderRadius: 140/2,
		marginTop: -50,
	},
	 
		})
export default ViewReport;  