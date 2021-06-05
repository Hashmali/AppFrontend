import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, Alert } from 'react-native'
import Loader from './Loader'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'

const EditProfile = (props) => {
  const getDetails = (type) => {
    if (props.route.params) {
      switch (type) {
        case 'first_name':
          return props.route.params.first_name
        case 'second_name':
          return props.route.params.second_name
        case 'email':
          return props.route.params.email
        case 'phone':
          return props.route.params.phone
        case 'address':
          return props.route.params.address
        case 'image':
          return props.route.params.image
        case 'toke':
          return props.route.params.toke
        case 'id':
          return props.route.params.id
      }
    }
    return ''
  }
  const navigation = useNavigation()

  const [first_name, setFirstName] = useState(getDetails('first_name'))
  const [second_name, setSecondName] = useState(getDetails('second_name'))
  const [email, setEmail] = useState(getDetails('email'))
  const [phone, setPhone] = useState(getDetails('phone'))
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState(getDetails('address'))
  const [pic, setPic] = useState('')
  const [toke, setToke] = useState(getDetails('toke'))
  const [id, setID] = useState(getDetails('id'))
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(false)

  var url = 'https://hashmali-backend.herokuapp.com/api/worker/' + id + '/edit/'
  var url2 = 'https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload'

  const UpdateDetails = () => {
    const option1 = {
      method: 'PATCH',
      headers: {
        Authorization: toke,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,
        second_name: second_name,
        phone: phone,
        password: password,
        email: email,
        address: address,
        image: pic,
      }),
    }

    const option2 = {
      method: 'PATCH',
      headers: {
        Authorization: toke,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,
        second_name: second_name,
        phone: phone,
        password: password,
        email: email,
        address: address,
      }),
    }
    if (pic) {
      return option1
    }
    return option2
  }

  const updateData = async (e) => {
    e.preventDefault()
    if (!password) {
      Alert.alert('please provide password!')
      return
    }

    setLoader(true)
    const data = await fetch(url, UpdateDetails()).catch((error) =>
      console.log(error)
    )
    setLoader(false)

    if (data.status === 200) {
      Alert.alert('Successfully updated data!')

      navigation.goBack()
    } else {
      Alert.alert('Oops something went wrong!')
    }

    console.log(JSON.stringify(data.status))
  }

  const pickFromGallery = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync()
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test/${data.uri.split('.')[1]}`,
        }
        handleUpload(newfile)
        console.log(data)
        //setImage(data)
      }
    } else {
      Alert.alert('You need to give up permissions')
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Camera.requestPermissionsAsync()
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test/${data.uri.split('.')[1]}`,
        }
        handleUpload(newfile)
        console.log(data)
        //setImage(data)
      }
    } else {
      Alert.alert('You need to give up permissions')
    }
  }

  if (loader) {
    return <Loader></Loader>
  }

  const handleUpload = (image) => {
    console.log(image)
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'hashmaliProject')
    data.append('cloud_name', 'dj42j4pqu')
    setLoader(true)
    fetch(url2, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPic(data.url)
        setModal(false)
      })
      .catch((error) => alert('error while uploading...'))
    setLoader(false)
  }

  return (
    <View style={styles.root}>
      <TextInput
        label="First Name"
        style={styles.inputStyle}
        theme={theme}
        value={first_name}
        mode="outlined"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        label="Last Name"
        style={styles.inputStyle}
        theme={theme}
        value={second_name}
        mode="outlined"
        onChangeText={(text) => setSecondName(text)}
      />

      <TextInput
        label="Email"
        style={styles.inputStyle}
        theme={theme}
        value={email}
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Phone"
        style={styles.inputStyle}
        theme={theme}
        value={phone}
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label="Password"
        type="password"
        style={styles.inputStyle}
        theme={theme}
        value={password}
        mode="outlined"
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        label="Address"
        style={styles.inputStyle}
        theme={theme}
        value={address}
        mode="outlined"
        onChangeText={(text) => setAddress(text)}
      />

      <Button
        style={styles.inputStyle}
        icon={pic == '' ? 'upload' : 'check'}
        mode="contained"
        theme={theme}
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={updateData}
      >
        Update Profile
      </Button>
      <Button
        style={styles.inputStyle}
        icon="keyboard-backspace"
        mode="contained"
        theme={theme}
        onPress={() => navigation.goBack()}
      >
        CANCEL
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={() => pickFromCamera()}
            >
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              onPress={() => pickFromGallery()}
            >
              gallery
            </Button>
          </View>

          <Button icon="camera" theme={theme} onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      ></View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
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
const theme = { colors: { primary: 'black' } }

export default EditProfile
