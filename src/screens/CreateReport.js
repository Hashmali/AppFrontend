import React,{useState} from 'react';
import {StyleSheet,View,Modal,Alert} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import DatePicker from 'react-native-datepicker';

const CreateReport=()=>{
const[title,setTitle]=useState("")
const[date,setDate]=useState("")
const[start_hour,setStartHour]=useState("")
const[finish_hour,setFinishHour]=useState("")
const[project_code,setProjectCode]=useState("")
const[image,setImage]=useState("")
const[description,setDescription]=useState("")
const[modal,setModal]=useState(false)




const sendReport=()=>{
console.log(title);
console.log(date);
console.log(start_hour);
console.log(finish_hour);
console.log(project_code);
console.log(description);

}




const pickFromGallery= async ()=>{
    const {granted}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
        let data= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        }) 
        if(!data.cancelled){
           setImage(data)

        }


    }else{
        Alert.alert("You need to give up permissions")

    }
}

const pickFromCamera= async ()=>{
    const {granted}=await Permissions.askAsync(Permissions.CAMERA)
    if(granted){
        let data= await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        }) 
        if(!data.cancelled){
            setImage(data)
        }


    }else{
        Alert.alert("You need to give up permissions")

    }
}













return(
<View style={styles.root}>

<TextInput
    label="Title"
    style={styles.inputStyle}
    theme={theme}
    value={title}
    mode='outlined'
    onChangeText={text=>setTitle(text)}
/>
<TextInput
    label="Start Hour"
    style={styles.inputStyle}
    theme={theme}
    value={start_hour}
    mode='outlined'
    onChangeText={text=>setStartHour(text)}
/>

<TextInput
    label="Finish Hour"
    style={styles.inputStyle}
    theme={theme}
    value={finish_hour}
    mode='outlined'
    onChangeText={text=>setFinishHour(text)}
/>
<TextInput
    label="Project Code"
    style={styles.inputStyle}
    theme={theme}
    value={project_code}
    mode='outlined'
    onChangeText={text=>setProjectCode(text)}
/>


<TextInput
    label="Description"
    style={styles.inputStyle}
    theme={theme}
    value={description}
    mode='outlined'
    onChangeText={text=>setDescription(text)}
/>










<View style={styles.container}>
     
        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="13-03-2021"
          maxDate="01-01-3001"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>




<Button 
    style={styles.inputStyle}
    icon="upload"
    mode="contained"
    theme={theme}
    onPress={()=>setModal(true)}>
    Upload Image
</Button>
<Button 
    style={styles.inputStyle}
    icon="content-save"
    mode="contained"
    theme={theme}
    onPress={sendReport}>
    Send Report 
</Button>




<Modal
    animationType="slide"
    transparent={true}
    visible={modal}
    onRequestClose={()=>{
        setModal(false)
    }}
>
<View style={styles.modalView}>
    <View style={styles.modalButtonView}>
            <Button
            icon="camera" 
            mode="contained"
            theme={theme}
            onPress={()=>pickFromCamera()}>
               camera
            </Button>
            <Button 
            icon="image-area"
             mode="contained"
             onPress={()=>pickFromGallery()}>
             gallery
            </Button>
    </View>

    <Button
     icon="camera"  
     theme={theme}
     onPress={()=>setModal(false)}>
        cancel
    </Button>
</View>


</Modal>



</View>


)

}

const styles=StyleSheet.create({
    root:{
        flex:1,
    },
    inputStyle:{
        margin:5
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
      },
      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
})
const theme={colors:{primary:"black"},}

export default CreateReport
