import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import DatePicker from 'react-native-datepicker'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio'
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

  const [first_name, setFirstName] = useState(getDetails('first_name'))
  const [second_name, setSecondName] = useState(getDetails('second_name'))
  const [email, setEmail] = useState(getDetails('email'))
  const [phone, setPhone] = useState(getDetails('phone'))
  const [address, setAddress] = useState(getDetails('address'))
  const [image, setImage] = useState(getDetails('image'))
  const [toke, setToke] = useState(getDetails('toke'))
  const [id, setID] = useState(getDetails('id'))
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(false)

  var url = 'https://hashmali-backend.herokuapp.com/api/worker/' + id + '/edit/'
  console.log(toke)

  const UpdateDetails = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        Authorization: toke,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,
        second_name: second_name,
      }),
    }
    return requestOptions
  }

  const updateData = async (e) => {
    e.preventDefault()
    setLoader(true)
    const data = await fetch(url, UpdateDetails()).catch((error) =>
      console.log(error)
    )
    console.log(JSON.stringify(data))
    setLoader(false)
  }

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      if (!data.cancelled) {
        setImage(data)
      }
    } else {
      Alert.alert('You need to give up permissions')
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA)
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      if (!data.cancelled) {
        setImage(data)
      }
    } else {
      Alert.alert('You need to give up permissions')
    }
  }

  return (
    <View style={styles.root}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loader && <Text>Loader is On</Text>}
      </View>

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
        label="Address"
        style={styles.inputStyle}
        theme={theme}
        value={address}
        mode="outlined"
        onChangeText={(text) => setAddress(text)}
      />

      <Button
        style={styles.inputStyle}
        icon="upload"
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
        Send Report
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
