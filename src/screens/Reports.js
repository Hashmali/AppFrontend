import { useLinkProps } from '@react-navigation/native'
import React from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { Card, FAB } from 'react-native-paper'
const Reports = ({ navigation }) => {
  const myReports = [
    {
      id: '0',
      title: 'First Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '2',
      title: 'Second Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '3',
      title: 'Third Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '4',
      title: 'Fourth Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '5',
      title: 'Fifth Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '6',
      title: 'Sixth Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '7',
      title: 'Seventh Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '8',
      title: 'Seventh Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '9',
      title: 'Eighth Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '10',
      title: 'Nineth Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
    {
      id: '11',
      title: 'Tenth Report',
      date: 'fiwej',
      start_hour: '10',
      finish_hour: '10',
      project_code: '10',
      image: '',
      description: 'do this and that',
    },
  ]

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        key={item.id}
        onPress={() => navigation.push('ViewReport', { item: item })}
      >
        <View style={styles.cardView}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </Card>
    )
  }

  return (
    <View>
      <FlatList
        data={myReports}
        renderItem={({ item }) => {
          return renderList(item)
        }}
        keyExtractor={(item) => `${item.id}`}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => navigation.push('CreateReport')}
        theme={{ colors: { accent: 'black' } }}
      />
    </View>
  )
}
export default Reports

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    padding: 5,
  },
  cardView: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 40,
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

/*import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';


const DATA = [
	{
	  id: '0',
	  title: 'First Item',
	  date:'fiwej',
	  start_hour:'10',
	  finish_hour:'10',
	  project_code:'10',
	  image:"",
	  description:"do this and that",

	},
	{
		id: '1',
		title: 'First Item',
		date:'fiwej',
		start_hour:'10',
		finish_hour:'10',
		project_code:'10',
		image:"",
		description:"do this and that",
  
	  },
	  {
		id: '2',
		title: 'First Item',
		date:'fiwej',
		start_hour:'10',
		finish_hour:'10',
		project_code:'10',
		image:"",
		description:"do this and that",
  
	  },
	  {
		id: '3',
		title: 'First Item',
		date:'fiwej',
		start_hour:'10',
		finish_hour:'10',
		project_code:'10',
		image:"",
		description:"do this and that",
  
	  },
	  {
		id: '4',
		title: 'First Item',
		date:'fiwej',
		start_hour:'10',
		finish_hour:'10',
		project_code:'10',
		image:"",
		description:"do this and that",
  
	  },
	
  ];
const Item = ({ title }) => (
	<View style={styles.item}>
	  <Text style={styles.title}>{title}</Text>
	
	
	</View>
  );
const Reports = (props) => {
	const renderItem = ({ item }) => (
		<Item title={item.title} />
	  );
	return (
		<SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
export default Reports;



const styles = StyleSheet.create({
  container: {
    
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 4,
	marginHorizontal: 10,
	borderRadius:15,
  },
  title: {
	fontSize: 32,
	color:"white",
	fontWeight:'bold',
  },
});

*/
