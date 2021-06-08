import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Modal, Text, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import Loader from './Loader'
import Icon from 'react-native-vector-icons/Entypo.js'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const CreateReport = (props) => {
  //----------------------------------------------------------------------------------
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setDate(date)
    console.log('A date has been picked: ', date)
    hideDatePicker()
  }
  //----------------------------------------------------------------------------------

  const [isStartTimeVisible, setStartTimeVisibility] = useState(false)

  const showStartTimePicker = () => {
    setStartTimeVisibility(true)
  }

  const hideStartTimePicker = () => {
    setStartTimeVisibility(false)
  }

  const handleStartTimeConfirm = (date) => {
    setStartHour(date)
    console.log('A start time has been picked: ', date)
    hideStartTimePicker()
  }
  //----------------------------------------------------------------------------------

  const [isEndTimeVisible, setEndTimeVisibility] = useState(false)

  const showEndTimePicker = () => {
    setEndTimeVisibility(true)
  }

  const hideEndTimePicker = () => {
    setEndTimeVisibility(false)
  }

  const handleEndTimeConfirm = (date) => {
    setEndingHour(date)
    console.log('An end time has been picked: ', date)
    hideEndTimePicker()
  }
  //----------------------------------------------------------------------------------

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
    let djangoFormatDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

    let djangoFormatStartTime =
      String(start_hour.getHours()) +
      ':' +
      String(start_hour.getMinutes()) +
      ':' +
      String(start_hour.getSeconds())

    let djangoFormatEndTime =
      String(ending_hour.getHours()) +
      ':' +
      String(ending_hour.getMinutes()) +
      ':' +
      String(ending_hour.getSeconds())

    console.log(djangoFormatDate)

    const option1 = {
      method: 'POST',
      headers: {
        Authorization: toke,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        project: project_code,
        worker: id,
        image: pic,
        date: djangoFormatDate,
        start_hour: djangoFormatStartTime,
        ending_hour: djangoFormatEndTime,
      }),
    }

    const option2 = {
      method: 'POST',
      headers: {
        Authorization: toke,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        title: title,
        description: description,
        project: project_code,
        worker: id,
        date: djangoFormatDate,
        start_hour: djangoFormatStartTime,
        ending_hour: djangoFormatEndTime,
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
    if (
      start_hour &&
      ending_hour & (start_hour.getTime() > ending_hour.getTime())
    ) {
      alert("start hour can't be greater than ending hour")
      return
    }
    if (!date) {
      Alert.alert('please provide date!')
      return
    }
    /*
    if (!pic) {
      alert('please upload an image...')
      return
    }
    */
    if (!project_code) {
      alert('please chose a project...')
      return
    }

    setLoader(true)
    const data = await fetch(url, reportOptions()).catch((error) =>
      console.log(error)
    )
    setLoader(false)

    if (data.status === 201) {
      Alert.alert('Successfully updated data!')

      navigation.goBack()
    } else {
      Alert.alert('Oops something went wrong!')
    }

    console.log(JSON.stringify(data.status))
  }
  //--------------------

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

  //--------------
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
        <View
          style={{ flexDirection: 'row', textAlign: 'center', marginLeft: 5 }}
        >
          <Button
            style={styles.buttonStyle}
            icon="calendar-month"
            mode="contained"
            theme={themeBlue}
            onPress={showDatePicker}
          >
            Date
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Button
            style={styles.buttonStyle}
            icon="clock-in"
            mode="contained"
            theme={themeBlue}
            onPress={showStartTimePicker}
          >
            Start Time
          </Button>
          <DateTimePickerModal
            isVisible={isStartTimeVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleStartTimeConfirm}
            onCancel={hideStartTimePicker}
          />

          <Button
            style={styles.buttonStyle}
            icon="clock-out"
            mode="contained"
            theme={themeBlue}
            onPress={showEndTimePicker}
          >
            End Time
          </Button>

          <DateTimePickerModal
            isVisible={isEndTimeVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleEndTimeConfirm}
            onCancel={hideEndTimePicker}
          />
        </View>

        <View style={{ flexDirection: 'row', textAlign: 'center' }}>
          <TextInput
            label="Date"
            style={styles.inputStyle}
            theme={theme}
            mode="outlined"
            value={
              date
                ? String(date.getFullYear()) +
                  '/' +
                  String(date.getMonth() + 1) +
                  '/' +
                  String(date.getDate())
                : 'pick date'
            }
            editable={false}
          />

          <TextInput
            label="Start Hour"
            style={styles.inputStyle}
            theme={theme}
            mode="outlined"
            value={
              start_hour
                ? String(start_hour.getHours()) +
                  ':' +
                  String(start_hour.getMinutes())
                : 'pick start time'
            }
            editable={false}
          />

          <TextInput
            label="Ending Hour"
            style={styles.inputStyle}
            theme={theme}
            mode="outlined"
            value={
              ending_hour
                ? String(ending_hour.getHours()) +
                  ':' +
                  String(ending_hour.getMinutes())
                : 'pick end time'
            }
            editable={false}
          />
        </View>

        <TextInput
          label="Title"
          style={styles.inputStyle}
          theme={theme}
          value={title}
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
        />

        {projects ? (
          <View>
            <TextInput
              mode="outlined"
              label="please select a project"
              value={project_code}
              render={() => (
                <RNPickerSelect
                  items={projects.map((project) => ({
                    key: project.id,
                    label: project.project_code,
                    value: String(project.id),
                    color: 'rgba(77,38,22,1)',
                  }))}
                  onValueChange={(value) => setProjectCode(value)}
                  placeholder={{ label: '', value: '' }}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyles}
                  Icon={() => (
                    <Icon name="chevron-down" size={22} color="gray" />
                  )}
                />
              )}
            />
          </View>
        ) : null}

        <TextInput
          label="Description"
          style={styles.inputStyle}
          theme={theme}
          value={description}
          mode="outlined"
          onChangeText={(text) => setDescription(text)}
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
    minWidth: 120,
  },
  buttonStyle: {
    margin: 5,
    maxWidth: 125,
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

const pickerStyles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    height: '100%',
    marginRight: 5,
  },
  inputIOS: {
    fontSize: 16,
    height: 56,
    paddingHorizontal: 14,
    color: 'black',
    textAlignVertical: 'center',
    width: '100%',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 56,
    paddingHorizontal: 14,
    color: 'black',
    textAlignVertical: 'center',
    width: '100%',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})

const theme = { colors: { primary: 'black' } }
const themeBlue = { colors: { primary: 'black' } }

export default CreateReport
