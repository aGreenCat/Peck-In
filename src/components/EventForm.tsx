import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EventForm = ({ addEvent }) => {
  const [showForm, setForms] = React.useState(false);
  
  return (
	<>
		<View style={styles.container}>
			<Text style={styles.greeting}>Add Event</Text>
			<TouchableOpacity onPress={() => setForms(!showForm)} style={styles.smallButton}>
				<Ionicons name='add' size={24} color="white" />
			</TouchableOpacity>
		</View>
		{showForm &&
			<View style={{backgroundColor: '#D8C1F0', padding: 16}}>
				
			</View>
		}
	</>
  );
};

const styles = StyleSheet.create({
  container: {
	width: '100%',
	flexDirection: 'row',
    alignItems: 'center',
	justifyContent: 'space-between',

	padding: 5,
	backgroundColor: '#60269e',
  },
  greeting: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 16,
	color: '#fff',
  },
  smallButton: {
	padding: 8,
	backgroundColor: 'transparent',
  },
  dropdownText: {
	color: '#60269e',
	marginBottom: 4,
  },
});

export default EventForm;