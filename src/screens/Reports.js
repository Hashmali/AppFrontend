import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
const DATA = [
	{
	  id: '0',
	  title: 'First Item',
	},
	{
	  id: '1',
	  title: 'Second Item',
	},
	{
	  id: '2',
	  title: 'Third Item',
	},
	{
		id: '3',
		title: 'First Item',
	  },
	  {
		id: '4',
		title: 'Second Item',
	  },
	  {
		id: '5',
		title: 'Third Item',
	  },
	  {
		id: '6',
		title: 'First Item',
	  },
	  {
		id: '7',
		title: 'Second Item',
	  },
	  {
		id: '8',
		title: 'Third Item',
	  },
	  {
		  id: '9',
		  title: 'First Item',
		},
		{
		  id: '10',
		  title: 'Second Item',
		},
		{
		  id: '11',
		  title: 'Third Item',
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

