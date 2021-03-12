import React,{useState} from 'react';
import {StyleSheet,View,Modal} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
const CreateReport=()=>{
const[title,setTitle]=useState("")
const[date,setDate]=useState("")
const[start_hour,setStartHour]=useState("")
const[finish_hour,setFinishHour]=useState("")
const[project_code,setProjectCode]=useState("")
const[image,setImage]=useState("")
const[description,setDescription]=useState("")
const[modal,setModal]=useState(false)

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
    label="Date"
    style={styles.inputStyle}
    theme={theme}
    value={date}
    mode='outlined'
    onChangeText={text=>setDate(text)}
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
    label="Image"
    style={styles.inputStyle}
    theme={theme}
    value={description}
    mode='outlined'
    onChangeText={text=>setDescription(text)}
/>

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
    onPress={()=>console.log()}>
    Save 
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
            onPress={()=>console.log(pressed)}>
               camera
            </Button>
            <Button 
            icon="image-area"
             mode="contained"
             onPress={()=>console.log(pressed)}>
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



})
const theme={colors:{primary:"black"},}

export default CreateReport
