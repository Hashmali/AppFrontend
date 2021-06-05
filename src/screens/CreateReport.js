import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Modal, Text, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import DatePicker from 'react-native-datepicker'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import Loader from './Loader'

const CreateReport = (props) => {
  const getDetails = (type) => {
    if (props.route.params) {
      switch (type) {
        case 'toke':
          return props.route.params.toke
        case 'id':
          return props.route.params.id
      }
    }
    return ''
  }
  const navigation = useNavigation()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [start_hour, setStartHour] = useState('')
  const [ending_hour, setEndingHour] = useState('')
  const [projects, setProjects] = useState([])
  const [project_code, setProjectCode] = useState('')
  const [image, setImage] = useState('')
  const [loader, setLoader] = useState(false)

  const [pic, setPic] = useState('')
  const [description, setDescription] = useState('')
  const [modal, setModal] = useState(false)
  const [toke, setToke] = useState(getDetails('toke'))
  const [id, setID] = useState(getDetails('id'))
  const [status, setStatus] = useState('')

  var url = 'https://hashmali-backend.herokuapp.com/api/report/create/'
  var url2 = 'https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload'
  var url3 = 'https://hashmali-backend.herokuapp.com/api/project/'

  const reportOptions = () => {
    const option1 = {
      method: 'PATCH',
      headers: {
        Authorization: toke,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        start_hour: start_hour,
        ending_hour: ending_hour,
        project: project,
        worker: id,
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
        title: title,
        description: description,
        start_hour: start_hour,
        ending_hour: ending_hour,
        project: project,
        worker: id,
      }),
    }
    if (pic) {
      return option1
    }
    return option2
  }

  const addReport = async (e) => {
    e.preventDefault()
    if (!title) {
      Alert.alert('please provide title!')
      return
    }
    if (!description) {
      Alert.alert('please provide description!')
      return
    }
    if (!start_hour) {
      Alert.alert('please provide start hour!')
      return
    }
    if (!ending_hour) {
      Alert.alert('please provide ending hour!')
      return
    }
    if (!date) {
      Alert.alert('please provide date!')
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

  const projectsRequest = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: toke },
  }

  const loadProjects = async () => {
    const data = await fetch(url3, projectsRequest).catch((error) =>
      console.error(error)
    )

    setStatus(data.status)
    const projects_data = await data.json()
    setProjects(projects_data)
    console.log(projects)
  }

  useEffect(() => {
    if (toke) {
      loadProjects()
    }
  }, [toke])

  if (loader) {
    return <Loader></Loader>
  }

  if (status == '200') {
    return (
      <View style={styles.root}>
        <TextInput
          label="Title"
          style={styles.inputStyle}
          theme={theme}
          value={title}
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          label="Start Hour"
          style={styles.inputStyle}
          theme={theme}
          value={start_hour}
          mode="outlined"
          onChangeText={(text) => setStartHour(text)}
        />

        <TextInput
          label="Ending Hour"
          style={styles.inputStyle}
          theme={theme}
          value={ending_hour}
          mode="outlined"
          onChangeText={(text) => setEndingHour(text)}
        />
        {projects ? (
          <View>
            <Text>select project</Text>
            <RNPickerSelect
              onValueChange={(value) => setProjectCode(value)}
              items={projects.map((project) => ({
                key: project.id,
                label: project.project_code,
                value: project.id,
                color: 'rgba(77,38,22,1)',
              }))}
            />
            <Text>{project_code}</Text>
          </View>
        ) : null}

        <TextInput
          label="Project Code"
          style={styles.inputStyle}
          theme={theme}
          value={project_code}
          mode="outlined"
          onChangeText={(text) => setProjectCode(text)}
        />

        <TextInput
          label="Description"
          style={styles.inputStyle}
          theme={theme}
          value={description}
          mode="outlined"
          onChangeText={(text) => setDescription(text)}
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
              setDate(date)
            }}
          />
        </View>

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
          onPress={addReport}
        >
          Create Report
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
  } else {
    return <Loader></Loader>
  }
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
  iconContainer: {
    top: 10,
    right: 12,
  },
})
const theme = { colors: { primary: 'black' } }

export default CreateReport
